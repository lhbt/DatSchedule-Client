define(['app/measurements', 'app/levelbar'], function(measurements, levelbar) {

    var color = measurements.backgroundColor;
    var _headerFont = "24px Candara";

    var init = function (stage) {

        var levels = new createjs.Shape();
        levels.graphics
            .beginFill(color).drawRect(measurements.stageWidth - measurements.levelsWidth, 0, measurements.levelsWidth, measurements.stageHeight - measurements.timelineHeight);
        stage.addChild(levels);

        levelbar.CreateBar(stage, "Stress");
        levelbar.CreateBar(stage, "Fatigue");
        levelbar.CreateBar(stage, "Hunger");

        var header = new createjs.Text();
        header.font = _headerFont;
        header.text = "Stats";
        header.x = measurements.stageWidth - measurements.levelsWidth + 10;
        header.y = 10;
        stage.addChild(header);
    };

    var update = function(data) {
        levelbar.UpdateBar("Stress", data.gameState.stressLevel);
        levelbar.UpdateBar("Fatigue", data.gameState.fatigueLevel);
        levelbar.UpdateBar("Hunger", data.gameState.hungerLevel);
    };

    return {
        Init: init,
        Update: update
    };
});
