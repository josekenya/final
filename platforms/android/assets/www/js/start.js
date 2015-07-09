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
                    //toast.showLong(result.success);
                  }
                  else
                  {
                     $(".toast").html(result.failure);
                     //toast.showLong(result.failure);
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
                            else if(result.userid==3)
                            {
                             
                             lStorage=$.sessionStorage;
                             var data={'username':result.username,'userId':result.userid,'depId':result.depid,'sessionId':result.session_id};
                             lStorage.set('loginDetails',data);
                             window.plugins.nativepagetransitions.slide({
                                  "direction":"left",
                                  "duration":"400",
                                  "androiddelay":"20",
                                  "href":"dep_ministry_page.html"
                            });
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
document.addEventListener('deviceready',function(){
  $(document).ready(function(){
    onDeviceready();
    document.addEventListener('offline',offlineCheck,false);
    document.addEventListener('online',onlineCheck,false);
    //exit app
   document.addEventListener("backbutton", function(){ 
      showPopUp();
    }, false);
    //transitions
    $("#next").click(function(){
        window.plugins.nativepagetransitions.slide({
          "direction":"left",
          "duration":"400",
          "androiddelay":"20",
          "href":"auth_sign_up.html"
      });
      });
    $("#login").click(function(){
    window.plugins.nativepagetransitions.slide({
      "direction":"left",
      "duration":"400",
      "androiddelay":"20",
      "href":"auth_log_in.html"
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

