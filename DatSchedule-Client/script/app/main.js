define(['app/engine', 'app/levels', 'app/timeline', 'app/tasklist', 'app/night', 'app/avatar', 'app/gameover', 'easel'], function (engine, levels, timeline, tasklist, night, avatar, gameover) {

    var init = function() {

        var stage = new createjs.Stage("demo");
        stage.enableMouseOver(20);

        timeline.Init(stage);

        levels.Init(stage);

        tasklist.Init(stage);

        avatar.Init(stage);

        stage.update();

        night.Init(stage);

        gameover.Init(stage);

        engine.Init();
    };

    return {
        Init: init
    };

});