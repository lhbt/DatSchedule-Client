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

        var timelineContainer = new createjs.Container();
        timelineContainer.addChild(timeline);

        var box1Container = new createjs.Container();
        box1Container.name = "box1container";
        //box1Container.x = 0;
        //box1Container.y = height - timelineHeight;
        box1Container.setBounds(0, height - timelineHeight, width / 4, timelineHeight);
        timelineContainer.addChild(box1Container);

        var box1Shape = new createjs.Shape();
        box1Shape.graphics.beginFill("#22aabb").drawRect(0, height - timelineHeight, width / 4, timelineHeight);
        //box1Shape.graphics.beginFill("#aaaaaa").drawRect(0, 0, width / 4, timelineHeight);
        box1Shape.x = 0;
        box1Shape.y = 0;
        box1Shape.name = "box1";
        box1Container.addChild(box1Shape);


        var box2Container = new createjs.Container();
        box2Container.name = "box2container";
        //box2Container.x = width / 4;
        //box2Container.y = height - timelineHeight;
        box2Container.setBounds(width / 4, height - timelineHeight, width / 4, timelineHeight);
        timelineContainer.addChild(box2Container);

        var box2Shape = new createjs.Shape();
        box2Shape.graphics.beginFill("#aaaaaa").drawRect(width / 4, height - timelineHeight, width / 4, timelineHeight);
        //box2Shape.graphics.beginFill("#aaaaaa").drawRect(0, 0, width / 4, timelineHeight);
        //box2Shape.x = width / 4;
        //box2Shape.y = height - timelineHeight;
        box2Shape.name = "box2";
        box2Container.addChild(box2Shape);

        levels.Init(stage, width, height, timelineHeight);

        stage.addChild(timelineContainer);

        var taskListWidth = 200;
        var taskList = new createjs.Shape();
        taskList.graphics.beginFill("#ffaaaa").drawRect(0, 0, taskListWidth, height - timelineHeight);
        stage.addChild(taskList);

        
        var dragger = new createjs.Container();
        dragger.x = dragger.y = 100;
        dragger.addChild(circle);

        stage.addChild(dragger);

        dragger.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX;
            evt.currentTarget.y = evt.stageY;
            stage.update();
        });

        dragger.on("pressup", function (evt) {
            var objects = stage.getObjectsUnderPoint(stage.mouseX, stage.mouseY);

            for (var i = 0; i < objects.length; i++) {
                var o = objects[i];
                if (o.name != undefined) {
                    if (o.name.lastIndexOf("box", 0) === 0) {
                        console.log("dropped item onto " + o.name);
                        var container = timelineContainer.getChildByName(o.name + "container");
                        evt.currentTarget.parent.removeChild(evt.currentTarget);
                        container.addChild(evt.currentTarget);
                        var bounds = container.getBounds();
                        //           evt.currentTarget.graphics.beginFill("red").drawCircle(bounds.x, bounds.y, 50);
                    }
                }
            }
            stage.update();
        });


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