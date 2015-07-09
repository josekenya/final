function admin()
{         
  //compose new update
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
 //compose sms
 $('button.btn').click(function(e){  
    $("#send_message").validate({
      submitHandler:function()
      {
            $.ajax({   
              type: "POST",
              url: "http://bgi.site40.net/bgi/send_sms",
              data: $("#send_message").serialize(),
              cache: false,
              beforeSend:function(){toast.showLong("Loading...");},
              complete:function(){toast.cancel();},
              success: function(result)
              { 
                 $(".toast").text(result);
                 //location.reload();   
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
    beforeSend:function(){toast.showLong("Loading data....");},
    complete:function(){toast.cancel();},
    success: function(json) 
       {
        _.templateSettings.variable="rc";
        var template=_.template($("#users").html());
        var storedItems=JSON.parse(json);
          //console.log(storedItems.adverts.length);
        $("#chats").html(template(storedItems));  
       }
    });
    //get offline contacts
     $.ajax({
      url: "http://bgi.site40.net/bgi/fetch_incoming_messages",
      success: function(json) 
         {
          _.templateSettings.variable="rc";
          var template=_.template($("#texts").html());
          var storedItems=JSON.parse(json);
            //console.log(storedItems.adverts.length);
          $("#contacts").html(template(storedItems));  
         }
    });
    //clicks on advert content 
    var lStorage=$.sessionStorage;
    $("#public_updates").on('click','a',function(e){ 
      var updatesId=$(this).attr('id');
      lStorage.set('upId',updatesId);
      window.location.href='common_update_detail.html';
      PUSH({url:"common_update_detail.html",transition:"slide-in"});
      e.preventDefault();
    }); 
    //clicks user chats
    $("#chats").on('click','a',function(e){ 
      var uId=$(this).attr('id');
      lStorage.set('chtId',uId);
      window.location.href='admin_chat_box.html';
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
/*
function fetchContacts()
{
  // find all contacts with 'Bob' in any name field
  var options = new ContactFindOptions();
  options.filter = "";
  var filter= ["name","phoneNumbers"];
  options.multiple=true;
  var fields = ["name", "phoneNumbers"];
  navigator.contacts.find(fields, onSuccess, onError, options);
}
function onSuccess(contacts)
{
  for (var i = 0; i < contacts.length; i++)
   {
    for(var j=0; j < contacts[i].phoneNumbers.length; j++)
    {
      var contact='<li class="table-view-cell media" ><a class="navigate-right" ><div class="media-body">'+ contacts[i].name.givenName+'<p>'+contacts[i].phoneNumbers[j].value +'</p></div></a></li>';
     $("#contacts").append(contact);
     $("#send_message").find("#recipient").val("<"+contacts[i].phoneNumbers[j].value+">");
    } 
   }
}
*/
function onError(contactError)
{
   toast.showLong('onError!');
}
window.addEventListener('push',admin);
document.addEventListener('deviceready',function(){
  $(document).ready(function(){
          admin();
          document.addEventListener('offline',offlineCheck,false);
          document.addEventListener('online',onlineCheck,false);
          //fetchContacts();
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
 

