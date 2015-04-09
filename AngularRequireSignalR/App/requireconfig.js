require.config({
    baseUrl: 'App',
    // alias paths for library modules
    paths: {
        'jquery': '../Scripts/jquery-2.1.3',
        angular: '../Scripts/angular',
        bootstrap: '../Scripts/bootstrap',
        respond: '../Scripts/respond',
        //'angular-route': '../Scripts/angular-route',
        'angular-signalr': '../Scripts/angular-signalr-hub',
        'jquery-signalR': '../Scripts/jquery.signalR-2.2.0'
    },

    // shim settings for files that are not AMD compliant
    // this tells require.js how to handle non-modular files
    shim: {
        angular: {
            exports: 'angular',
            // only use jquery if you have an absolute need to do so
            // don't forget to add it to bower and the paths config above
            deps: ['jquery'] 
        },
        'angular-route': {
            deps: ['angular']
        },
        'jquery-signalr': {
            deps: ['jquery']
        },
        'angular-signalr': {
            deps: ['angular', 'jquery-signalR']
        },
        'bootstrap': {
            deps: ['jquery', 'respond']
        }
    }
});
