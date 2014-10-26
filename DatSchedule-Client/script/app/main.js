define(['app/engine', 'app/levels', 'app/timeline', 'app/tasklist', 'app/night', 'app/avatar', 'app/gameover','app/status', 'easel'], function (engine, levels, timeline, tasklist, night, avatar, gameover, status) {

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

        gameover.Init(stage);

        var name = prompt("Enter your name: ");

        engine.Init(name);


    };

    return {
        Init: init
    };

});