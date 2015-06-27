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
      var details='<li class="table-view-cell"><div class="media-body"><p>'+comment+'</p></div></li>';
      $('body').find('#governor_chat').fadeIn(1000).prepend(details);
      $('body').find('#my_msg').val(" ");
      $.ajax({type:'POST',url:'http://bgi.site40.net/bgi/add_message',data:{comments:comment,sender:user_id,reciever:admin_id}});
      e.preventDefault();
    });
   //updates from governor
  $.ajax({
    url: "http://bgi.site40.net/bgi/fetch_update",
    //dataType:'json',
    beforeSend:function(){toast.showLong("Fetching Data...");},
    complete:function(){toast.cancel();},
    success: function(json) 
       {
        _.templateSettings.variable="rc";
          var template=_.template($("#topics").html());
          var storedItems=JSON.parse(json);
          //console.log(storedItems.adverts.length);
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
        success: function(json) 
           {
            _.templateSettings.variable="rc";
            var template=_.template($("#admin-topic").html());
            var storedItems=JSON.parse(json);
              //console.log(storedItems.adverts.length);
            $("#governor_chat").html(template(storedItems));  
           }
        });
       //clicks on advert content 
        $("#county_stories").on('click','a',function(e){ 
          var listId=$(this).attr('id');
          lStorage.set('upId',listId);
          window.location.href='update_detail.html';
          PUSH({url:"update_detail.html",transition:"slide-in"});
          e.preventDefault();
        }); 
                         
}
function offlineCheck() {
    
    toast.showLong('Ooops! You are offline.');
} 
function onlineCheck() {
    
    toast.showLong('You are connected to a network.');
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
 });
 




//

