define(['app/engine', 'app/levels', 'app/timeline', 'app/tasklist', 'app/night', 'app/avatar', 'app/status', 'easel'], function (engine, levels, timeline, tasklist, night, avatar, status) {

    var init = function() {

        var stage = new createjs.Stage("demo");
        stage.enableMouseOver(20);

        timeline.Init(stage);

        levels.Init(stage);

        tasklist.Init(stage);

        avatar.Init(stage);

        status.Init(stage);

        stage.update();

        night.Init(stage);

        engine.Init();
    };

    return {
        Init: init
    };

});