define(['app/measurements'], function(measurements) {

    var timelineContainer;

    var init = function(stage) {

        var timeline = new createjs.Shape();
        timeline.graphics.beginFill("#aaaaff").drawRect(0, measurements.stageHeight - measurements.timelineHeight, measurements.stageWidth, measurements.timelineHeight);

        timelineContainer = new createjs.Container();
        timelineContainer.addChild(timeline);

        stage.addChild(timelineContainer);
    };

    return {
        Init: init
    };

});