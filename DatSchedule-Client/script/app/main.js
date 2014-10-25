define(['app/levels', 'easel'], function (levels) {

    var init = function() {

        var width = 800;
        var height = 600;

        var stage = new createjs.Stage("demo");
        var circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0, 0, 50);

        var timelineHeight = 125;
        var timeline = new createjs.Shape();
        timeline.graphics.beginFill("#aaaaff").drawRect(0, height - timelineHeight, width, timelineHeight);
        stage.addChild(timeline);

        levels.Init(stage, width, height, timelineHeight);

        var taskListWidth = 200;
        var taskList = new createjs.Shape();
        taskList.graphics.beginFill("#ffaaaa").drawRect(0, 0, taskListWidth, height - timelineHeight);
        stage.addChild(taskList);

        var dragger = new createjs.Container();
        dragger.x = dragger.y = 100;
        dragger.addChild(circle);

        stage.addChild(dragger);

        dragger.on("pressmove", function(evt) {
            evt.currentTarget.x = evt.stageX;
            evt.currentTarget.y = evt.stageY;
            stage.update();
        });

        stage.update();

        var serviceUrl = 'http://datschedule.apphb.com/game';

        $.get(
            serviceUrl,
            function(data) {
                console.log(data);
            }
        );
    };

    return {
        Init: init
    };

});