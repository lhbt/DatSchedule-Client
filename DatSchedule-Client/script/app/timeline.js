define(['app/measurements'], function(measurements) {

    var _stage;
    var _timeslots = [];

    var hours = { start: 9, end: 17 };

    var sliceSize = measurements.timelineWidth / (hours.end - hours.start + 1);

    var offsets = { shape: { x: sliceSize }, text: { x: sliceSize }, spacing: { x: 4, y: 4 } };
    var sizes = { shape: { width: sliceSize } };

    var init = function(stage) {
        _stage = stage;

        var timeline = new createjs.Shape();
        timeline.graphics.beginFill("#aaaaff").drawRect(0, measurements.stageHeight - measurements.timelineHeight, measurements.stageWidth, measurements.timelineHeight);

        var timelineContainer = new createjs.Container();
        timelineContainer.addChild(timeline);

        _stage.addChild(timelineContainer);
        
        for (var i = hours.start; i <= hours.end; i++) {
            createTimeslot(i);
        }

    };

    var createTimeslot = function(hour) {
        
        var timeslot = new createjs.Shape();
        timeslot.graphics.beginFill("#aaaaff").beginStroke("#000000").drawRect((_timeslots.length * offsets.shape.x), measurements.stageHeight - measurements.timelineHeight, sizes.shape.width, measurements.timelineHeight);
        _stage.addChild(timeslot);

        var timetext = new createjs.Text();
        timetext.x = (_timeslots.length * offsets.text.x) + offsets.spacing.x;
        timetext.y = measurements.stageHeight - measurements.timelineHeight + offsets.spacing.y;
        timetext.text = hour+":00";
        _stage.addChild(timetext);
        
        _timeslots.push(hour);
    };

    return {
        Init: init
    };

});