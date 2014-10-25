define(['app/levels', 'app/timeline', 'app/tasklist', 'easel'], function (levels, timeline, tasklist) {

    var init = function() {

        var stage = new createjs.Stage("demo");
        
        timeline.Init(stage);

        levels.Init(stage);

        tasklist.Init(stage);

        var circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(100, 100, 50);
        stage.addChild(circle);

        stage.update();

        var serviceUrl = 'http://datschedule.apphb.com/game';

        $.get(
            serviceUrl,
            function (data) {
                console.log(data);
            }
        );
    };

    return {
        Init: init
    };

});