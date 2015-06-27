function init()
{ 
            
 //fetch user id
    lStorage=$.sessionStorage;
    if(lStorage.isSet('loginDetails'))
    {
      var id=lStorage.get('loginDetails.userId');
      //console.log(id);
      $('#hUid').attr({'value':id})
      
    }
    else
    {
      console.log('not here');
}
  //validate and add new topic
 $('button.btn').click(function(e){  
  	$("#add_update").validate({
      submitHandler:function()
      {
            $.ajax({   
              type: "POST",
              url: "http://bgi.site40.net/bgi/add_update",
              data: $("#add_update").serialize(),
              cache: false,
              dataType:"json",
              beforeSend:function(){toast.showLong("Loading...");},
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
  //get public updates
  $.ajax({
  url: "http://bgi.site40.net/bgi/fetch_update",
  cache:false,
  beforeSend:function(){toast.showLong("Fetching data....");},
  complete:function(){toast.cancel();},
  success: function(json) 
  {
  _.templateSettings.variable="rc";
    var template=_.template($("#updates").html());
    var storedItems=JSON.parse(json);
    $("#public_updates").html(template(storedItems));
  }
  });
//users chat threads
 $.ajax({
  url: "http://bgi.site40.net/bgi/fetch_user_list",
  success: function(json) 
     {
      _.templateSettings.variable="rc";
      var template=_.template($("#users").html());
      var storedItems=JSON.parse(json);
        //console.log(storedItems.adverts.length);
      $("#chats").html(template(storedItems));  
     }
});

//clicks on advert content 
$("#public_updates").on('click','a',function(e){ 
  var updatesId=$(this).attr('id');
  lStorage.set('upId',updatesId);
  window.location.href='update_detail.html';
  PUSH({url:"update_detail.html",transition:"slide-in"});
  e.preventDefault();
});  

//clicks user chats
$("#chats").on('click','a',function(e){ 
  var uId=$(this).attr('id');
  lStorage.set('chtId',uId);
  window.location.href='admin_chat_box.html';
  e.preventDefault();
});               
}
function offlineCheck() {
    
    toast.showLong("Ooops! You are offline.");
} 
function onlineCheck() {
    
    toast.showLong("You are connected to a network.");
}
function exitapp()
{
  navigator.app.exitApp();
}
window.addEventListener('push',init);
document.addEventListener('deviceready',function(){
  $(document).ready(function(){
          init();
          document.addEventListener('offline',offlineCheck,false);
          document.addEventListener('online',onlineCheck,false);
          //exit app
           document.addEventListener("backbutton", function(){ 
              exitapp();
            }, false);
          //logout
          $('.logout').on('click',function(){
              $.removeAllStorages();
              window.location.href="index.html";
          });    
 });
},false);
 

