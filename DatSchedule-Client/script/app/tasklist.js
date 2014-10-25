define(['app/measurements', 'easel'], function(measurements) {

    var color = "#ffaaaa";

    var init = function(stage) {
        var taskList = new createjs.Shape();
        taskList.graphics.beginFill(color).drawRect(0, 0, measurements.tasklistWidth, measurements.tasklistHeight);
        stage.addChild(taskList);
    };

    return {
        Init: init
    };

});