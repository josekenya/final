function ministry()
{         
  //fetch user id
    lStorage=$.sessionStorage;
    var id=lStorage.get('loginDetails.depId');
    $('#dep_id').attr({'value':id})

  //validate and add new topic
 $('button.btn').click(function(e){  
  	$("#compose_discussion").validate({
      submitHandler:function()
      {
            $.ajax({   
              type: "POST",
              url: "http://bgi.site40.net/bgi/add_issue",
              data: $("#compose_discussion").serialize(),
              cache: false,
              dataType:"json",
              beforeSend:function(){toast.showLong("Sending...");},
              complete:function(){toast.cancel();},
              success: function(result)
              { 
              if(result.success)
              {
                 $(".toast").text(result.success);
                 location.reload();   
              } 
              else
              {
                 $(".toast").text(result.failure);
              }     
              }
              }); 
              e.preventDefault();  
        }
    });     
  });
  //get get ministry topics 
    var lStorage=$.sessionStorage;
    var did=1;
    $.ajax({
    url: "http://bgi.site40.net/bgi/fetch_min_topics",
    data:{id:did},
    beforeSend:function(){toast.showLong("Loading data....");},
    complete:function(){toast.cancel();},
    success: function(json) 
    {
    _.templateSettings.variable="rc";
      var template=_.template($("#min_issues").html());
      var storedItems=JSON.parse(json);
      $("#discussions").html(template(storedItems));
    }
    });
   //users chat threads
    $.ajax({
    url: "http://bgi.site40.net/bgi/fetch_contact_list",
    beforeSend:function(){toast.showLong("Loading data....");},
    complete:function(){toast.cancel();},
    success: function(json) 
       {
        _.templateSettings.variable="rc";
        var template=_.template($("#users").html());
        var storedItems=JSON.parse(json);
          //console.log(storedItems.adverts.length);
        $("#chat_contacts").html(template(storedItems));  
       }
    });
//clicks on advert content 
var lStorage=$.sessionStorage;
$("#discussions").on('click','a',function(e){ 
  var issueId=$(this).attr('id');
  lStorage.set('issueId',issueId);
  window.location.href='common_discussion_comments.html';
  PUSH({url:"common_discussion_comments.html",transition:"slide-in"});
  e.preventDefault();
}); 
//clicks user chats
$("#chat_contacts").on('click','a',function(e){ 
  var uId=$(this).attr('id');
  lStorage.set('chtId',uId);
  window.location.href='dep_ministry_chat.html';
  e.preventDefault();
}); 
//show message composer
}

function offlineCheck() {
    
    toast.showLong("Ooops! You are offline.");
} 
function onlineCheck() {
    
    toast.showLong("You are connected to a network.");
}
function showPopUp()
{
  navigator.notification.confirm(
        "Do you really want to close this app?", 
        function(buttonIndex){
            exitapp(buttonIndex);
        }, 
        "Confirmation", 
        "Yes,No"
    ); 
}
function exitapp(stat)
{
   if(stat == "1"){
        navigator.app.exitApp();
    }else{
        return;
    };
}
window.addEventListener('push',ministry);
document.addEventListener('deviceready',function(){
  $(document).ready(function(){
          ministry();
          document.addEventListener('offline',offlineCheck,false);
          document.addEventListener('online',onlineCheck,false);
          //exit app
           document.addEventListener("backbutton", function(){ 
              showPopUp();
            }, false);
          //logout
          $('.logout').on('click',function(){
              $.removeAllStorages();
              window.location.href="index.html";
          });    
 });
},false);
 

