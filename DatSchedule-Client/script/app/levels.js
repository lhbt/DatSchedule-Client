define(['app/measurements', 'app/levelbar'], function(measurements, levelbar) {

    var color = measurements.backgroundColor;

    var init = function (stage) {

        var levels = new createjs.Shape();
        levels.graphics.beginFill(color).drawRect(measurements.stageWidth - measurements.levelsWidth, 0, measurements.levelsWidth, measurements.stageHeight - measurements.timelineHeight);
        stage.addChild(levels);

        levelbar.CreateBar(stage, "Stress");
        levelbar.CreateBar(stage, "Fatigue");
        levelbar.CreateBar(stage, "Hunger");
    };

    var update = function(data) {

        levelbar.UpdateBar("Stress", data.gameState.stressLevel);
        levelbar.UpdateBar("Fatigue", data.gameState.tirednessLevel);
        levelbar.UpdateBar("Hunger", data.gameState.hungerLevel);
    };

    return {
        Init: init,
        Update: update
    };
});
