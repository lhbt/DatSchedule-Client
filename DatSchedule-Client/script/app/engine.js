define(['jquery', 'app/tasklist', 'app/timeline', 'app/levels', 'app/night'], function($, tasklist, timeline, levels, night) {

    var gameId;
    var _data;

    var init = function() {
        var serviceUrl = 'http://datschedule.apphb.com/game';

        $.get(
            serviceUrl,
            function (data) {
                gameId = data.id;
                populateTaskList(data.currentDay.tasks);
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
                _data = data;
                if (data.gameState.dayIsOver) {
                    night.SlideIn(nightTime);
                }
                levels.Update(data);
            },
            'json');
    };
    
    function nightTime() {
        timeline.Clear();
        night.SlideOut(dayTime);
    }

    function dayTime() {
        populateTaskList(_data.currentDay.tasks);
    }

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