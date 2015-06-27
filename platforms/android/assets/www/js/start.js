function onDeviceready()
{
  //validate and signup form
   $("#submit-signup").click(function(e){
      $("#signup").validate({
        submitHandler: function()
        {
            $.ajax({
                type: "POST",
                url: "http://bgi.site40.net/bgi/create_user",
                dataType: "json",
                data: $("#signup").serialize(),
                beforeSend:function(){toast.showLong("Please wait");},
                complete:function(){toast.cancel();},
                success:function(result)
                {
                  if(result.success)
                  {
                    $(".toast").html(result.success);
                  }
                  else
                  {
                     $(".toast").html(result.failure);
                  }
                }
              });
          e.preventDefault();
        }
      }); 
      });
     //validate and login to the app
     $('#submit-login').click(function(e){
        $("#login-form").validate({
          submitHandler: function()
          {
            $.ajax({  
                  type: "POST",
                  url: "http://bgi.site40.net/bgi/login",
                  data: $("#login-form").serialize(),
                  dataType:"json",
                  beforeSend:function(){toast.showLong("Please wait...");},
                  complete:function(){toast.cancel();},
                  success: function(result)
                  {
                        //$("#error-msg").html(result).removeClass('hide');
                        if(result.userid)
                         {
                            if(result.userid==2)
                            {
                             console.log(result);
                             lStorage=$.sessionStorage;
                             var data={'username':result.username,'userId':result.userid,'sessionId':result.session_id};
                             lStorage.set('loginDetails',data);
                             window.plugins.nativepagetransitions.slide({
                                  "direction":"left",
                                  "duration":"400",
                                  "androiddelay":"20",
                                  "href":"admin_page.html"
                            });
                             //window.location.href="admin_page.html";
                            }
                            else
                            {
                             console.log(result);
                             lStorage=$.sessionStorage;
                             var data={'username':result.username,'userId':result.userid,'sessionId':result.session_id};
                             lStorage.set('loginDetails',data);
                             window.plugins.nativepagetransitions.slide({
                                  "direction":"left",
                                  "duration":"400",
                                  "androiddelay":"20",
                                  "href":"user_page.html"
                            });
                             //window.location.href="user_page.html";
                            }
                         }
                         else
                         {
                           $(".toast").html(result.failure);
                         }              
                  },
                  error:function(err)
                  {
                   toast.showLong(err);
                  }
                });
            e.preventDefault();
          }
        });   
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
document.addEventListener('deviceready',function(){
  $(document).ready(function(){
    onDeviceready();
    document.addEventListener('offline',offlineCheck,false);
    document.addEventListener('online',onlineCheck,false);
    //exit app
   document.addEventListener("backbutton", function(){ 
      exitapp();
    }, false);
    //transitions
    $("#next").click(function(){
        window.plugins.nativepagetransitions.slide({
          "direction":"left",
          "duration":"400",
          "androiddelay":"20",
          "href":"sign_up.html"
    });
    });
    $("#back").click(function(){
      window.plugins.nativepagetransitions.slide({
      "direction":"right",
      "duration":"400",
      "androiddelay":"20",  
      "href":"index.html"
    });
    });
  });
},false);

