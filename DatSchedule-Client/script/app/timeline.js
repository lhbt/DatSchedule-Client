define(['app/measurements'], function(measurements) {

    var timelineContainer;

    var init = function(stage) {

        var timeline = new createjs.Shape();
        timeline.graphics.beginFill("#aaaaff").drawRect(0, measurements.stageHeight - measurements.timelineHeight, measurements.stageWidth, measurements.timelineHeight);

        timelineContainer = new createjs.Container();
        timelineContainer.addChild(timeline);

        var box1Container = new createjs.Container();
        box1Container.name = "box1container";
        //box1Container.x = 0;
        //box1Container.y = height - timelineHeight;
        box1Container.setBounds(0, measurements.stageHeight - measurements.timelineHeight, measurements.stageWidth / 4, measurements.timelineHeight);
        timelineContainer.addChild(box1Container);

        var box1Shape = new createjs.Shape();
        box1Shape.graphics.beginFill("#22aabb").drawRect(0, measurements.stageHeight - measurements.timelineHeight, measurements.stageWidth / 4, measurements.timelineHeight);
        //box1Shape.graphics.beginFill("#aaaaaa").drawRect(0, 0, width / 4, timelineHeight);
        box1Shape.x = 0;
        box1Shape.y = 0;
        box1Shape.name = "box1";
        box1Container.addChild(box1Shape);


        var box2Container = new createjs.Container();
        box2Container.name = "box2container";
        //box2Container.x = width / 4;
        //box2Container.y = height - timelineHeight;
        box2Container.setBounds(measurements.stageWidth / 4, measurements.stageHeight - measurements.timelineHeight, measurements.stageWidth / 4, measurements.timelineHeight);
        timelineContainer.addChild(box2Container);

        var box2Shape = new createjs.Shape();
        box2Shape.graphics.beginFill("#aaaaaa").drawRect(measurements.stageWidth / 4, measurements.stageHeight - measurements.timelineHeight, measurements.stageWidth / 4, measurements.timelineHeight);
        //box2Shape.graphics.beginFill("#aaaaaa").drawRect(0, 0, width / 4, timelineHeight);
        //box2Shape.x = width / 4;
        //box2Shape.y = height - timelineHeight;
        box2Shape.name = "box2";
        box2Container.addChild(box2Shape);

        stage.addChild(timelineContainer);
    };

    var addChild = function(containerName, object) {
        var container = timelineContainer.getChildByName(containerName);
        container.addChild(object);
    };

    return {
        Init: init,
        AddChild: addChild
    };

});