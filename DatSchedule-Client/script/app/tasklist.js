define(['app/measurements', 'easel'], function(measurements) {

    var _taskFont = "14px Candara";
    var _headerFont = "24px Candara";

    var _stage;
    var _tasks = [];

    var offsets = {
         shape: {
             x: 10,
             y: 25,
             spacing: 3,
             radius: 5
         },
         text: {
             x: 15,
             y: 25,
             spacing: 4
         },
        duration: {
            x: 160,
            y: 25,
            spacing: 4
        },
        header: {
            height: 30
        }
    };

    var sizes = {
        width: measurements.tasklistWidth - 20,
        height: 20
    };
    
    var init = function(stage) {
        _stage = stage;

        var taskList = new createjs.Shape();
        taskList.graphics.beginFill(measurements.backgroundColor).drawRect(0, 0, measurements.tasklistWidth, measurements.tasklistHeight);
        _stage.addChild(taskList);

        var header = new createjs.Text();
        header.font = _headerFont;
        header.text = "Tasks";
        header.x = 10;
        header.y = 10;
        _stage.addChild(header);
    };

    var createTask = function (task, scheduledCallback) {
        _tasks.push(task);

        var container = new createjs.Container();

        registerCursorEvents(container);

        createTaskItem(task, container);
        createTaskText(task, container);
        createDurationText(task, container);
        var taskDisableLayer = createDisableLayer(task, container);

        container.on('click', function () {
            if (scheduledCallback()) {
                taskDisableLayer.alpha = 0.5;
                container.removeAllEventListeners();
                document.body.style.cursor = 'default';
                _stage.update();
            }
        });

        _stage.addChild(container);
        _stage.update();
    };

    function calculateTextY() {
        return (_tasks.length * offsets.text.y) + offsets.text.spacing + offsets.header.height;
    }

    function calculateItemY() {
        return (_tasks.length * offsets.shape.y) + offsets.shape.spacing + offsets.header.height;
    }

    function createTaskItem(task, container) {
        var taskItem = new createjs.Shape();
        taskItem.graphics
            .beginFill(task.colorCode).drawRoundRect(offsets.shape.x, calculateItemY(), sizes.width, sizes.height, offsets.shape.radius)
            .beginStroke('#999999').drawRoundRect(offsets.shape.x, calculateItemY(), sizes.width, sizes.height, offsets.shape.radius);
        container.addChild(taskItem);
    }

    function createTaskText(task, container) {
        var taskText = new createjs.Text();
        taskText.font = _taskFont;
        taskText.text = task.name;
        taskText.x = offsets.text.x;
        taskText.y = calculateTextY();
        container.addChild(taskText);
        return taskText;
    }

    function createDurationText(task, container) {
        var durationText = new createjs.Text();
        durationText.font = _taskFont;
        durationText.text = task.duration + 'hr';
        durationText.x = offsets.duration.x;
        durationText.y = calculateTextY();
        container.addChild(durationText);
        return durationText;
    }

    function createDisableLayer(task, container) {
        var taskDisableLayer = new createjs.Shape();
        taskDisableLayer.alpha = 0.0;
        taskDisableLayer.graphics.beginFill("#999999").drawRect(offsets.shape.x, calculateItemY(), sizes.width, sizes.height);
        container.addChild(taskDisableLayer);
        return taskDisableLayer;
    }

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