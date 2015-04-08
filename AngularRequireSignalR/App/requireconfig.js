require.config({
    baseUrl: 'App',
    // alias paths for library modules
    paths: {
        angular: '../Scripts/angular',
        'angular-route': 'Scripts/angular-route',
    },

    // shim settings for files that are not AMD compliant
    // this tells require.js how to handle non-modular files
    shim: {
        angular: {
            exports: 'angular',
            // only use jquery if you have an absolute need to do so
            // don't forget to add it to bower and the paths config above
            //deps: ['jquery'] 
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-bindonce': {
            deps: ['angular']
        }
    }
});
