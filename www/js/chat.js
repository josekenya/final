$(function(){
	//admin message compose
   $('#send').click(function(e){  
      var lStorage=$.sessionStorage;
      var user_id=lStorage.get('chtId');
      var comment=$('#msg_text').val();
      var admin_id=3;
      var username=lStorage.get('loginDetails.username');
      var details='<li class="table-view-cell media"><img class="media-object pull-left" src="img/user.png"><div class="media-body"><label class="update">'+ username +'</label><p>'+ comment+'</p><p class="time">just now</p></div></li>';
      $('#chat_thread').fadeIn(1000).prepend(details);
      $('#msg_text').val(" ");
      $.ajax({type:'POST',url:'http://bgi.site40.net/bgi/add_chat',data:{comments:comment,sender:admin_id,reciever:user_id}});
      e.preventDefault();
    });
   //get chat messages
    var s=$.sessionStorage;
    var chId=s.get('chtId');
    $.ajax({
    url: "http://bgi.site40.net/bgi/fetch_min_chats",
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
    //chat intervals
    window.setInterval(function(){
      var s=$.sessionStorage;
      var chId=s.get('chtId');
      $.ajax({
      url: "http://bgi.site40.net/bgi/fetch_min_chats",
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
      PUSH({url:"dep_ministry_page.html",transition:"slide-in"});
      window.location.href='dep_ministry_page.html';
      e.preventDefault();
    }); 
});