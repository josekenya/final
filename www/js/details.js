function init()
{
  //ad session variable
      var eid=$.sessionStorage;
      var listId=eid.get('upId');
      $.ajax({url: "http://bgi.site40.net/bgi/fetch_topic_detail",data:{id:listId},
        beforeSend:function(){$("#loading").text("Loading...");},
        complete:function(){$("#loading").text(" ");},
        success: function(json) 
           {
             _.templateSettings.variable="rc";
                var template=_.template($("#topic-detail").html());
                var storedItems=JSON.parse(json);
                $('body').find("#details").html(template(storedItems));   
           }
    }); 
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
      e.preventDefault();
    }); 
}
document.addEventListener('deviceready',function(){
  $(document).ready(function(){
    init();
  });
  
});  