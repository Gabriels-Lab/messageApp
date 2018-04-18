var adminApp = {};
(function(){
    var currentUser = null;
    appFB.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          currentUser = user;
        }else{
            location.replace("../login.html");
        }
      });

      function getUserGroups(){
        var path = "/userGroups";
        apiService.autoRead(path, function(data){
            var userGroups = data.val();
            var listContainer = document.getElementById("userUids-container");
            var spanElm;
            listContainer.innerHTML = null;
            if(userGroups.permitted){
                for (var uid in userGroups.permitted){
                    spanElm = document.createElement("span");
                    spanElm.innerHTML = uid;
                    spanElm.classList.add("permited-user-span");
                    listContainer.appendChild(spanElm);
                }
            }
            console.log(userGroups);
        }, function(err){
            console.log(err);
        })

      }

      function init(){
        getUserGroups()

      }


      function fnAddUid(){
        var uidElm = document.getElementById("input-userUid");
        var uidVal = uidElm.value;
        var path = "/userGroups/permitted/" + uidVal;  
        var body = {
            id: uidVal
        };


        apiService.create(path, body, function(err){
            if(err){
                console.log(err)
            }else{
                console.log("success");
            }
        })
      }



      init();

      adminApp.addUid = fnAddUid;

})()