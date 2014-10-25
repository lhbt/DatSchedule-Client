define(function() {

    var width = 200;
    var color = "#aaffaa";

    var init = function (stage, stageWidth, stageHeight, timelineHeight) {

        var levels = new createjs.Shape();
        levels.graphics.beginFill(color).drawRect(stageWidth - width, 0, width, stageHeight - timelineHeight);
        stage.addChild(levels);
    };

    return {
        Init: init
    };
});
