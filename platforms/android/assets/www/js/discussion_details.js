function init()
{
  FastClick.attach(document.body);
  //add comment
  var eid=$.sessionStorage;
  $('#send_comment').on('click',function(e){  
      var user_id=eid.get('loginDetails.userId');
      var issue_id=eid.get('issueId');
      var comment=$('#my_comment').val();
      var username=lStorage.get('loginDetails.username');
      var details='<li class="table-view-cell media" > <img class="media-object pull-left" src="img/person.png"><div class="media-body"><label class="update">'+ username +'</label><p>'+comment+'</p><p class="time">just now</p></div></li>';
      $('body').find('#issue_comments').fadeIn(1000).append(details);
      $('#my_comment').val(" ");
      $.ajax({type:'POST',url:'http://bgi.site40.net/bgi/add_comment',data:{comments:comment,issue_id:issue_id,user_id:user_id}});
      e.preventDefault();
    });
    //ad session variable and fetch discussion details
      var listId=eid.get('issueId');
      $.ajax({url: "http://bgi.site40.net/bgi/fetch_issue_detail",data:{id:listId},
        beforeSend:function(){toast.showLong("Loading...");},
        complete:function(){toast.cancel();},
        success: function(json) 
           {
             _.templateSettings.variable="rc";
                var template=_.template($("#issue-detail").html());
                var storedItems=JSON.parse(json);
                $('body').find("#issue_details").html(template(storedItems));   
           }
      });
      
      //get disscussion comments 
      var listId=eid.get('issueId');
      $.ajax({url: "http://bgi.site40.net/bgi/fetch_issue_comments",data:{id:listId},
        beforeSend:function(){toast.showLong("Loading...");},
        complete:function(){toast.cancel();},
        success: function(json) 
           {
             _.templateSettings.variable="rc";
                var template=_.template($("#comments").html());
                var storedItems=JSON.parse(json);
                $('body').find("#issue_comments").html(template(storedItems));   
           }
      });
      //comment count
      var listId=eid.get('issueId');
      $.getJSON("http://bgi.site40.net/bgi/fetch_comment_count",{id:listId},function(data){
        $('#issueComments').find("#count").html(data.count);
      });
     //click back
      $("body").on('click','#back',function(e){
       var lStorage=$.sessionStorage;
       var uid=lStorage.get('loginDetails.userId');
       if(uid==3)
       {
        PUSH({url:"dep_ministry_page.html",transition:"slide-in"});
        window.location.href='dep_ministry_page.html';
      }else if(uid==2){
         PUSH({url:"admin_page.html",transition:"slide-in"});
         window.location.href='admin_page.html';
      }
      else
      {
         PUSH({url:"user_ministry_topics.html",transition:"slide-in"});
         window.location.href='user_ministry_topics.html';
      }
        e.preventDefault();
      }); 
}
document.addEventListener('deviceready',function(){
  $(document).ready(function(){
    init();
  });
  });  