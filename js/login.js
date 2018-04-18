(function () {
    appFB.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          location.replace("index.html");
        }else{
            init();
            
        }
      });

      function init(){
        var ui = new firebaseui.auth.AuthUI(appFB.auth());
    
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: 'index.html',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                appFB.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };
    
        ui.start('#firebaseui-auth-container', uiConfig);
      }
})()


