define(['jquery', 'app/tasklist', 'app/timeline', 'app/levels'], function($, tasklist, timeline, levels) {

    var gameId;

    var init = function() {
        var serviceUrl = 'http://datschedule.apphb.com/game';

        $.get(
            serviceUrl,
            function (data) {
                gameId = data.id;
                var tasks = data.currentDay.tasks;
                for (var i in tasks) {
                    tasklist.CreateTask(tasks[i], createCallback(tasks[i]));
                }
            }
        );
    };

    var createCallback = function(task) {
        return function() { return taskScheduled(task); };
    };
    
    var taskScheduled = function(task) {
        var success = timeline.ScheduleTask(task);
        if (success) {
            scheduleTaskOnServer(task);
        }
        return success;
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