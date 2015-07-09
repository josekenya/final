function init()
{ 
    FastClick.attach(document.body);
    //validate  add message
    $('#send_msg').click(function(e){  
      var lStorage=$.sessionStorage;
      var user_id=lStorage.get('loginDetails.userId');
      var comment=$('#my_msg').val();
      var admin_id=2;
      var username=lStorage.get('loginDetails.username');
      var details='<li class="table-view-cell media"><img class="media-object pull-left" src="img/user.png"><div class="media-body"><label class="update">'+ username +'</label><p>'+ comment+'</p><p class="time">just now</p></div></li>';
      $('body').find('#governor_chat').fadeIn(1000).prepend(details);
      $('#my_msg').val(" ");
      $.ajax({type:'POST',url:'http://bgi.site40.net/bgi/add_message',data:{comments:comment,sender:user_id,reciever:admin_id}});
      e.preventDefault();
    });
    //add files
    //list ministries
     $.ajax({
    url: "http://bgi.site40.net/bgi/fetch_ministries",
    //dataType:'json',
    beforeSend:function(){toast.showLong("Loading Data...");},
    complete:function(){toast.cancel();},
    success: function(json) 
       {
        _.templateSettings.variable="rc";
          var template=_.template($("#ministries").html());
          var storedItems=JSON.parse(json);
          //console.log(storedItems.adverts.length);
          $("#county_ministries").html(template(storedItems));
       }
      });
   //updates from governor
    $.ajax({
    url:"http://bgi.site40.net/bgi/fetch_update",
    //dataType:'json',
    beforeSend:function(){toast.showLong("Loading Data...");},
    complete:function(){toast.cancel();},
    success: function(json) 
       {
        _.templateSettings.variable="rc";
          var template=_.template($("#topics").html());
          var storedItems=JSON.parse(json);
          $("#county_stories").html(template(storedItems));
       }
      });
     //list user chat thread
      var lStorage=$.sessionStorage;
      var id=lStorage.get('loginDetails.userId');
      $.ajax({
        url: "http://bgi.site40.net/bgi/fetch_user_thread",
        data:{user_id:id},
        //dataType:"json",
        cache:false,
        beforeSend:function(){toast.showLong("Loading Data...");},
        complete:function(){toast.cancel();},
        success: function(json) 
           {
            _.templateSettings.variable="rc";
            var template=_.template($("#admin-topic").html());
            var storedItems=JSON.parse(json);
              //console.log(storedItems.adverts.length);
            $("#governor_chat").html(template(storedItems));  
           }
        }); 
        //chat intervals
      window.setInterval(function(){
      var lStorage=$.sessionStorage;
      var id=lStorage.get('loginDetails.userId');
      $.ajax({
        url: "http://bgi.site40.net/bgi/fetch_user_thread",
        data:{user_id:id},
        //dataType:"json",
        cache:false,
        success: function(json) 
           {
            _.templateSettings.variable="rc";
            var template=_.template($("#admin-topic").html());
            var storedItems=JSON.parse(json);
              //console.log(storedItems.adverts.length);
            $("#governor_chat").html(template(storedItems));  
           }
        }); 
      }, 10000); 
       //clicks on updates
        $("#county_stories").on('click','a',function(e){ 
          var listId=$(this).attr('id');
          lStorage.set('upId',listId);
          window.location.href='common_update_detail.html';
          PUSH({url:"common_update_detail.html",transition:"slide-in"});
          e.preventDefault();
        }); 
        //clicks on ministries
        $("#county_ministries").on('click','a',function(e){ 
          var listId=$(this).attr('id');
          lStorage.set('departmentId',listId);
          window.location.href='user_ministry_topics.html';
          PUSH({url:"user_ministry_topics.html",transition:"slide-in"});
          e.preventDefault();
        }); 

        $("#upload").on('click',function(e){ 
            getImage();
          e.preventDefault();
        }); 
                         
}
function getImage() {
            // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, function(message) {
    alert('get picture failed');
    },
    {
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
    });
 
}
function uploadPhoto(imageURI)
 {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            var lStorage=$.sessionStorage;
            var params = new Object();
            params.sender =lStorage.get('loginDetails.userId');;
            params.reciever =2;
 
            options.params = params;
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://bgi.site40.net/bgi/add_photo", win, fail, options);
  }
  function win(r) 
  {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            alert(r.response);
  }
 
  function fail(error) 
  {
      alert("An error has occurred: Code "+ error.code);
  }
function offlineCheck() {
    
    toast.showLong('Ooops! You are offline.');
} 
function onlineCheck() {
    
    toast.showLong('You are connected to a network.');
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
 window.addEventListener('push',init);
 document.addEventListener('deviceready',function(){
    $(document).ready(function(){
          init();
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
 });
 




//

