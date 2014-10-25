
require.config({
    baseUrl: 'script',
    shim: {
        easel: {
            exports: 'createjs'
        }
    },
    paths: {
        jquery: 'lib/jquery-1.11.1.min',
        easel: 'lib/easeljs-0.7.0.min'
    }
});

require(['jquery', 'app/main'], function($, app) {
    $(function () {
        app.Init();
    });
});