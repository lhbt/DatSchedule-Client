define(['app/measurements'], function(measurements) {

    var _taskFont = "14px Candara";

    var _stage;
    var _timeslots = [];
    var _scheduledTasks = [];

    var hours = { start: 9, end: 17 };

    var _nextFreeSlot = hours.start;

    var sliceSize = measurements.timelineWidth / (hours.end - hours.start + 1);

    var offsets = {
         shape: {
              x: sliceSize
         },
         text: {
              x: sliceSize
         },
         spacing: {
             x: 4,
             y: 4
         },
        scheduledTask: {
            x: 5,
            y: 20,
            height: 100,
            radius: 8
        }
    };
    var sizes = { shape: { width: sliceSize } };

    var init = function(stage) {
        _stage = stage;

        var timeline = new createjs.Shape();
        timeline.graphics.beginFill(measurements.backgroundColor).drawRect(0, measurements.stageHeight - measurements.timelineHeight, measurements.stageWidth, measurements.timelineHeight);

        var timelineContainer = new createjs.Container();
        timelineContainer.addChild(timeline);

        _stage.addChild(timelineContainer);
        
        for (var i = hours.start; i <= hours.end; i++) {
            createTimeslot(i);
        }

    };

    var createTimeslot = function(hour) {
        var timeslot = new createjs.Shape();
        timeslot.name = hour;
        var index = hour - hours.start;
        timeslot.graphics
            .beginStroke('#CDDBDF')
            .setStrokeStyle(2)
            .moveTo((index * offsets.shape.x)-1, measurements.stageHeight - measurements.timelineHeight)
            .lineTo((index * offsets.shape.x)-1, measurements.stageHeight);
        _stage.addChild(timeslot);

        var timetext = new createjs.Text();
        timetext.x = (_timeslots.length * offsets.text.x) + offsets.spacing.x;
        timetext.y = measurements.stageHeight - measurements.timelineHeight + offsets.spacing.y;
        timetext.text = hour+":00";
        _stage.addChild(timetext);
        
        _timeslots.push(hour);

        _stage.update();
    };

    function nextFreeSlotIndex() {
        return _nextFreeSlot - hours.start;
    }

    var scheduleTask = function (task) {
        if (nextFreeSlotIndex() + task.duration > _timeslots.length) {
            playAudio();
            return false;
        }

        drawScheduledTask(task);
        _nextFreeSlot += task.duration;
        return true;
    };

    function drawScheduledTask(task) {
        var x = (nextFreeSlotIndex() * offsets.shape.x) + offsets.scheduledTask.x;
        var y = measurements.stageHeight - measurements.timelineHeight + offsets.scheduledTask.y;
        var width = (task.duration * sliceSize) - (2 * offsets.scheduledTask.x);

        var shape = new createjs.Shape();
        shape.name = task.name;
        shape.graphics
            .beginFill(task.colorCode).drawRoundRect(x, y, width, offsets.scheduledTask.height, offsets.scheduledTask.radius)
            .beginStroke('#999999').drawRoundRect(x, y, width, offsets.scheduledTask.height, offsets.scheduledTask.radius);
        _stage.addChild(shape);

        var text = new createjs.Text();
        text.font = _taskFont;
        text.text = task.name;
        text.name = task.name + '_text';
        text.x = x + offsets.scheduledTask.x;
        text.y = y + (offsets.scheduledTask.height / 3);
        _stage.addChild(text);

        _stage.update();

        _scheduledTasks.push(task);
    }

    function playAudio() {
        document.getElementById("out-of-time").play();
    }

    var clear = function() {
        for (var i in _scheduledTasks) {
            var shape = _stage.getChildByName(_scheduledTasks[i].name);
            _stage.removeChild(shape);
            var text = _stage.getChildByName(_scheduledTasks[i].name + '_text');
            _stage.removeChild(text);
        }
        _scheduledTasks = [];
        _nextFreeSlot = hours.start;
        _stage.update();
    };

    return {
        Init: init,
        ScheduleTask: scheduleTask,
        Clear: clear
    };

});