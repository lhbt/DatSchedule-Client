define(['jquery', 'app/tasklist', 'app/timeline', 'app/levels'], function($, tasklist, timeline, levels) {

    var gameId;

    var init = function() {
        var serviceUrl = 'http://datschedule.apphb.com/game';

        $.get(
            serviceUrl,
            function (data) {
                gameId = data.id;
                populateTaskList(data.currentDay.tasks);
                timeline.Clear();
                levels.Reset();
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
            function (data) {
                if (data.gameOver) {
                    alert("OH NOES! You have daed of " + levels.GetCauseOfDeath(data).join(' '));
                    init();
                    return;
                }
                if (data.gameState.dayIsOver) {
                    populateTaskList(data.currentDay.tasks);
                    timeline.Clear();
                }
                levels.Update(data);
            },
            'json');
    };
    
    var populateTaskList = function(tasks) {
        tasklist.Clear();
        for (var i in tasks) {
            tasklist.CreateTask(tasks[i], createCallback(tasks[i]));
        }
    }

    return {
        Init: init
    };

});