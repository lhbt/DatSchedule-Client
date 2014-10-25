define(['jquery', 'app/tasklist'], function($, tasklist) {

    var gameId;

    var init = function() {
        var serviceUrl = 'http://datschedule.apphb.com/game';

        $.get(
            serviceUrl,
            function (data) {
                gameId = data.id;
                for (var i in data.tasks) {
                    tasklist.CreateTask(data.tasks[i]);
                }
            }
        );
    };

    return {
        Init: init
    };

});