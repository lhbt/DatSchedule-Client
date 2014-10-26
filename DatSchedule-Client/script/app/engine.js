﻿define(['jquery', 'app/tasklist', 'app/timeline', 'app/levels', 'app/night', 'app/avatar'], function($, tasklist, timeline, levels, night, avatar) {

    var gameId;
    var _data;

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
                _data = data;
                if (data.gameOver) {
                    alert("OH NOES! You have daed of " + levels.GetCauseOfDeath(data).join(' '));
                    init();
                    return;
                }
                if (data.gameState.dayIsOver) {
                    night.SlideIn(nightTime);
                }
                levels.Update(data);
                avatar.Update(data);
            },
            'json');
    };
    
    function nightTime() {
        setTimeout(pauseForDay, 3000);
    }

    function pauseForDay() {
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