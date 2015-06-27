$(function(){
	//validate  add message
   $('#send_msg').click(function(e){  
      var lStorage=$.sessionStorage;
      var user_id=lStorage.get('chtId');
      var comment=$('#my_msg').val();
      var admin_id=2;
      //var time_stamp= new Date().getTime();
      var username=lStorage.get('loginDetails.username');
      var details='<li class="table-view-cell"><p>'+comment+'</p></li>';
      $('body').find('#chat_thread').fadeIn(1000).prepend(details);
      $('body').find('#comment').val("");
      $.ajax({type:'POST',url:'http://bgi.site40.net/bgi/add_message',data:{comments:comment,sender:admin_id,reciever:user_id}});
      e.preventDefault();
    });
   //get user chats
    var s=$.sessionStorage;
    var chId=s.get('chtId');
    $.ajax({
    url: "http://bgi.site40.net/bgi/fetch_user_chats",
    data:{id:chId},
    cache:false,
    success: function(json) 
     {
      _.templateSettings.variable="rc";
      var template=_.template($("#user_chats").html());
      var storedItems=JSON.parse(json);
        //console.log(storedItems.adverts.length);
      $("#chat_thread").html(template(storedItems));  
     }
});
   //get admin chats
	//click back
    $("body").on('click','#back',function(e){
     var lStorage=$.sessionStorage;
     var uid=lStorage.get('loginDetails.userId');
     if(uid==2)
     {
      PUSH({url:"admin_content.html",transition:"slide-in"});
      window.location.href='admin_page.html';
    }else{
      PUSH({url:"main_content.html",transition:"slide-in"});
      window.location.href='user_page.html';
    }
      //console.log('yes');
      e.preventDefault();
    }); 
});