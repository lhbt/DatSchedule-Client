define(['app/engine', 'app/levels', 'app/timeline', 'app/tasklist', 'app/night', 'easel'], function (engine, levels, timeline, tasklist, night) {

    var init = function() {

        var stage = new createjs.Stage("demo");
        stage.enableMouseOver(20);

        timeline.Init(stage);

        levels.Init(stage);

        tasklist.Init(stage);

        stage.update();

        night.Init(stage);

        engine.Init();
    };

    return {
        Init: init
    };

});