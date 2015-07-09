function chat()
{ 
    FastClick.attach(document.body);
    //validate  add message
    $('#send_chat').on('click',function(e){  
      var lStorage=$.sessionStorage;
      var user_id=lStorage.get('loginDetails.userId');
      var dep_id=3;
      var comment=$('#chat').val();
      var username=lStorage.get('loginDetails.username');
      var details='<li class="table-view-cell media"><img class="media-object pull-left" src="img/user.png"><div class="media-body"><label class="update">'+ username +'</label><p>'+ comment+'</p><p class="time">just now</p></div></li>';
      $('body').find('.center-text').addClass('hide');
      $('body').find('#ministry_chat').fadeIn(1000).prepend(details);
      $('#chat').val(" ");
      $.ajax({type:'POST',url:'http://bgi.site40.net/bgi/add_chat',data:{comments:comment,sender:user_id,reciever:dep_id}});
      e.preventDefault();
    });
  
    //list issues by department
    var ls=$.sessionStorage;
    var id=ls.get('departmentId');
     $.ajax({
    url: "http://bgi.site40.net/bgi/fetch_min_topics",
    data:{id:id},
    //dataType:'json',
    beforeSend:function(){toast.showLong("Loading Data...");},
    complete:function(){toast.cancel();},
    success: function(json) 
       {
        _.templateSettings.variable="rc";
          var template=_.template($("#user_discussions").html());
          var storedItems=JSON.parse(json);
          //console.log(storedItems.adverts.length);
          $("#county_discussions").html(template(storedItems));
       }
      });
   //chats between department and user
   var user_id=ls.get('loginDetails.userId');
    $.ajax({
    url: "http://bgi.site40.net/bgi/fetch_min_user_thread",
    data:{id:user_id},
    //dataType:'json',
    beforeSend:function(){toast.showLong("Loading Data...");},
    complete:function(){toast.cancel();},
    success: function(json) 
       {
        _.templateSettings.variable="rc";
          var template=_.template($("#my_chat").html());
          var storedItems=JSON.parse(json);
          //console.log(storedItems.adverts.length);
          $("#ministry_chat").html(template(storedItems));
       }
      });
      //interval chat  
       //clicks on updates
        $("#county_discussions").on('click','a',function(e){ 
          var listId=$(this).attr('id');
          ls.set('issueId',listId);
          window.location.href='common_discussion_comments.html';
          PUSH({url:"common_discussion_comments.html",transition:"slide-in"});
          e.preventDefault();
        }); 

         $("#back").on('click',function(e){ 
          window.location.href='user_page.html';
          PUSH({url:"user_page.html",transition:"slide-out"});
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
      quality: 50, 
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100
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
 window.addEventListener('push',chat);
 document.addEventListener('deviceready',function(){
    $(document).ready(function(){
          chat();
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
 




//

