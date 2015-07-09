$(function(){
	//admin message compose
   $('#send').click(function(e){  
      var lStorage=$.sessionStorage;
      var user_id=lStorage.get('chtId');
      var comment=$('#msg_text').val();
      var admin_id=2;
      var username=lStorage.get('loginDetails.username');
      var details='<li class="table-view-cell media"><img class="media-object pull-left" src="img/user.png"><div class="media-body"><label class="update">'+ username +'</label><p>'+ comment+'</p><p class="time">just now</p></div></li>';
      $('#chat_thread').fadeIn(1000).prepend(details);
      $('#msg_text').val(" ");
      $.ajax({type:'POST',url:'http://bgi.site40.net/bgi/add_message',data:{comments:comment,sender:admin_id,reciever:user_id}});
      e.preventDefault();
    });
   //get chat messages
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
    window.setInterval(function(){
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
    },10000);
	//click back
    $("body").on('click','#back',function(e){
     var lStorage=$.sessionStorage;
     var uid=lStorage.get('loginDetails.userId');
     if(uid==2)
     {
      PUSH({url:"admin_page.html",transition:"slide-in"});
      window.location.href='admin_page.html';
    }else{
      PUSH({url:"user_page.html",transition:"slide-in"});
      window.location.href='user_page.html';
    }
      //console.log('yes');
      e.preventDefault();
    }); 
});