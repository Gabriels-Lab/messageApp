var mainApp = {};
(function(){
    var currentUser = null;
    appFB.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          currentUser = user;
        }else{
            location.replace("login.html");
        }
      });

    function fnLogout(){
        appFB.auth().signOut();
    }

    function generateId(){
        return 'xxx-xxxxx-xxx'.replace(/[x]/g, function(){
            return (Math.random() * 9 | 0 ).toString();
        })
    }

    function fnDeleteMessage(e){
        var messageId = e.target.id;
        var path = 'messages/' + messageId;
        apiService.delete(path, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("message deleted")
            }
        })
    }

    function fnSendMessage(){
        var messageElm = document.getElementById("input-message");
        var userNameElm = document.getElementById("input-userName");
        var messageId = generateId();
        var path = 'messages/' + messageId;
        var body = {
            message: messageElm.value,
            userName: userNameElm.value,
            uid: currentUser.uid
        }
        apiService.create(path, body, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("success");
            }
        })
    }

    function getMessages(){
        var path = 'messages';
        var messagesContainer = document.getElementById("right-panel");

        apiService.autoRead(path, function(data){
            var messages = data.val();
            var div, h3, messageContainer, headerMessage, contentMessage;
            if(!!messages){
            messagesContainer.innerHTML = null;
                for(messageId in messages){
                    messageContainer = document.createElement("div");
                    messageContainer.classList.add("message-container");
                        headerMessage = document.createElement("div");
                        headerMessage.classList.add("header-message");
                            h3 = document.createElement("h3");
                            h3.innerHTML = messages[messageId].userName;
                            h3.classList.add("message-header-username");
                        headerMessage.appendChild(h3);
                            h3 = document.createElement("h3");
                            h3.innerHTML = "X";
                            h3.title = "Delete Message";
                            h3.id = messageId;
                            h3.addEventListener("click", mainApp.deleteMessage);
                            h3.classList.add("message-header-x");
                        headerMessage.appendChild(h3);
                    messageContainer.appendChild(headerMessage);
                        contentMessage = document.createElement("div");
                        contentMessage.classList.add("center-text")
                            h3 = document.createElement("h3");
                            h3.classList.add("center-text");
                            h3.innerHTML = messages[messageId].message;
                        contentMessage.appendChild(h3);
                    messageContainer.appendChild(contentMessage);
            messagesContainer.appendChild(messageContainer);
                }
            }
            

        }, function(err){console.log(err)})
    }
    
    function init(){
        setTimeout(function(){
            getMessages();
        })
        
    }

    init();

      mainApp.logout = fnLogout;
      mainApp.sendMessage = fnSendMessage;
      mainApp.deleteMessage = fnDeleteMessage
})()