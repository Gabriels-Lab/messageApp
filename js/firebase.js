var appFB = {};
(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDwPz6ln2Vnc1zQ68PyMPtSVET9yGNhs-U",
        authDomain: "usergroups-8da40.firebaseapp.com",
        databaseURL: "https://usergroups-8da40.firebaseio.com",
        projectId: "usergroups-8da40",
        storageBucket: "usergroups-8da40.appspot.com",
        messagingSenderId: "32456290348"
    };
    firebase.initializeApp(config);
    appFB = firebase;
})();