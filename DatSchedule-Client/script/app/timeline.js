define(['app/measurements'], function(measurements) {

    var _stage;
    var _timeslots = [];

    var hours = { start: 9, end: 17 };

    var _nextFreeSlot = hours.start;

    var sliceSize = measurements.timelineWidth / (hours.end - hours.start + 1);

    var offsets = { shape: { x: sliceSize }, text: { x: sliceSize }, spacing: { x: 4, y: 4 } };
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

    var drawShapeAt = function(shape, slot, fillColor) {
        var index = slot - hours.start;
        shape.graphics
            .beginFill(fillColor)
            .drawRect((index * offsets.shape.x), measurements.stageHeight - measurements.timelineHeight, sizes.shape.width, measurements.timelineHeight)
            .endFill()
            .beginStroke("#000000")
            .drawRect((index * offsets.shape.x), measurements.stageHeight - measurements.timelineHeight, sizes.shape.width, measurements.timelineHeight)
            .endFill();
    };

    var createTimeslot = function(hour) {
        var timeslot = new createjs.Shape();
        timeslot.name = hour;
        //drawShapeAt(timeslot, hour, measurements.backgroundColor);
        var index = hour - hours.start;
        timeslot.graphics
            .beginStroke('#000000')
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

        for (var i = 0; i < task.duration; ++i) {
            var taskShape = _stage.getChildByName(_nextFreeSlot);
            drawShapeAt(taskShape, _nextFreeSlot, "#aaffaa");
            _stage.update();
            _nextFreeSlot++;
        }
        return true;
    };

    function playAudio() {
        document.getElementById("out-of-time").play();
    }

    return {
        Init: init,
        ScheduleTask: scheduleTask
    };

});