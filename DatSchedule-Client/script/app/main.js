define(['app/engine', 'app/levels', 'app/timeline', 'app/tasklist', 'easel'], function (engine, levels, timeline, tasklist) {

    var init = function() {

        var stage = new createjs.Stage("demo");
        
        timeline.Init(stage);

        levels.Init(stage);

        tasklist.Init(stage);

        stage.update();

        engine.Init();
    };

    return {
        Init: init
    };

});