define(['app/measurements', 'easel'], function(measurements) {

    var color = "#ffaaaa";
    var _stage;
    var _tasks = [];
    
    var init = function(stage) {
        _stage = stage;

        var taskList = new createjs.Shape();
        taskList.graphics.beginFill(color).drawRect(0, 0, measurements.tasklistWidth, measurements.tasklistHeight);
        _stage.addChild(taskList);
    };

    var createTask = function (task) {
        _tasks.push(task);
        
        var taskItem = new createjs.Shape();
        taskItem.graphics.beginFill("#ffffff").drawRect(10, (_tasks.length * 20) + 3, 100, 15);
        _stage.addChild(taskItem);

        var taskText = new createjs.Text();
        taskText.text = task;
        taskText.x = 15;
        taskText.y = (_tasks.length * 20) + 4;
        _stage.addChild(taskText);

        _stage.update();
    };

    return {
        Init: init,
        CreateTask: createTask
    };

});