define(['app/levels', 'app/timeline', 'app/tasklist', 'easel'], function (levels, timeline, tasklist) {

    var init = function() {

        var stage = new createjs.Stage("demo");
        var circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0, 0, 50);

        timeline.Init(stage);

        levels.Init(stage);

        tasklist.Init(stage);

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
                        evt.currentTarget.parent.removeChild(evt.currentTarget);
                        timeline.AddChild(o.name + "container", evt.currentTarget);
                        //var bounds = container.getBounds();
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