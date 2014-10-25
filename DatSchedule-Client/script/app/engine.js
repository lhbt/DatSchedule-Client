define(['jquery', 'app/tasklist', 'app/timeline', 'app/levels'], function($, tasklist, timeline, levels) {

    var gameId;

    var init = function() {
        var serviceUrl = 'http://datschedule.apphb.com/game';

        $.get(
            serviceUrl,
            function (data) {
                gameId = data.id;
                for (var i in data.tasks) {
                    tasklist.CreateTask(data.tasks[i], createCallback(data.tasks[i]));
                }
            }
        );
    };

    var createCallback = function(task) {
        return function() { taskScheduled(task); };
    };
    
    var taskScheduled = function(task) {
        timeline.ScheduleTask(task);
        scheduleTaskOnServer(task);
    };

    var scheduleTaskOnServer = function(task) {
        var serviceUrl = 'http://datschedule.apphb.com/update/'+gameId;
        $.post(serviceUrl,
            JSON.stringify(task),
            function(data) {
                levels.Update(data);
            },
            'json');
    };

    return {
        Init: init
    };

});