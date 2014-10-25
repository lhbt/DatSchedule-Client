define(['app/measurements', 'easel'], function(measurements) {

    var _color = "#ffaaaa";
    var _stage;
    var _tasks = [];

    var offsets = { shape: { x: 10, y: 20, spacing: 3 }, text: { x: 15, y: 20, spacing: 4 } };
    var sizes = { width: 100, height: 15 };
    
    var init = function(stage) {
        _stage = stage;

        var taskList = new createjs.Shape();
        taskList.graphics.beginFill(_color).drawRect(0, 0, measurements.tasklistWidth, measurements.tasklistHeight);
        _stage.addChild(taskList);
    };

    var createTask = function (task, scheduledCallback) {
        _tasks.push(task);
        
        var taskItem = new createjs.Shape();
        taskItem.graphics.beginFill("#ffffff").drawRect(offsets.shape.x, (_tasks.length * offsets.shape.y) + offsets.shape.spacing, sizes.width, sizes.height);
        taskItem.on('click', scheduledCallback);
        _stage.addChild(taskItem);

        var taskText = new createjs.Text();
        taskText.text = task;
        taskText.x = offsets.text.x;
        taskText.y = (_tasks.length * offsets.text.y) + offsets.text.spacing;
        _stage.addChild(taskText);

        _stage.update();
    };

    return {
        Init: init,
        CreateTask: createTask
    };

});