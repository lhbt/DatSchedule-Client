define(['app/measurements'], function(measurements) {

    var color = "#aaffaa";

    var init = function (stage) {

        var levels = new createjs.Shape();
        levels.graphics.beginFill(color).drawRect(measurements.stageWidth - measurements.levelsWidth, 0, measurements.levelsWidth, measurements.stageHeight - measurements.timelineHeight);
        stage.addChild(levels);
    };

    var update = function(data) {
        console.log(data);
    };

    return {
        Init: init,
        Update: update
    };
});
