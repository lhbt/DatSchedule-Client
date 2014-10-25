define(['app/measurements', 'easel'], function(measurements) {

    var _color = "#ffaaaa";
    var _stage;
    var _tasks = [];

    var offsets = { shape: { x: 10, y: 20, spacing: 3 }, text: { x: 15, y: 20, spacing: 4 } };
    var sizes = { width: measurements.tasklistWidth - 20, height: 15 };
    
    var init = function(stage) {
        _stage = stage;

        var taskList = new createjs.Shape();
        taskList.graphics.beginFill(_color).drawRect(0, 0, measurements.tasklistWidth, measurements.tasklistHeight);
        _stage.addChild(taskList);
    };

    var createTask = function (task, scheduledCallback) {
        _tasks.push(task);

        var container = new createjs.Container();
        container.on('click', function () {
            taskDisableLayer.alpha = 0.5;
            container.removeAllEventListeners();
            document.body.style.cursor = 'default';
            scheduledCallback();
        });

        registerCursorEvents(container);

        var taskItem = new createjs.Shape();
        taskItem.graphics.beginFill("#ffffff").drawRect(offsets.shape.x, (_tasks.length * offsets.shape.y) + offsets.shape.spacing, sizes.width, sizes.height);
        container.addChild(taskItem);

        var taskText = new createjs.Text();
        taskText.text = task.name;
        taskText.x = offsets.text.x;
        taskText.y = (_tasks.length * offsets.text.y) + offsets.text.spacing;
        container.addChild(taskText);

        var taskDisableLayer = new createjs.Shape();
        taskDisableLayer.alpha = 0.0;
        taskDisableLayer.graphics.beginFill("#999999").drawRect(offsets.shape.x, (_tasks.length * offsets.shape.y) + offsets.shape.spacing, sizes.width, sizes.height);
        container.addChild(taskDisableLayer);

        _stage.addChild(container);
        _stage.update();
    };

    function registerCursorEvents(item) {
        item.on('mouseover', function (e) {
            document.body.style.cursor = 'pointer';
        });

        item.on('mouseout', function (e) {
            document.body.style.cursor = 'default';
        });
    }

    return {
        Init: init,
        CreateTask: createTask
    };

});