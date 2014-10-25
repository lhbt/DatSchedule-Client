define(['app/measurements', 'easel'], function(measurements) {

    var _font = "14px Candara";

    var _color = "#ffaaaa";
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
        }
    };

    var sizes = {
        width: measurements.tasklistWidth - 20,
        height: 20
    };
    
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
            if (scheduledCallback()) {
                taskDisableLayer.alpha = 0.5;
                container.removeAllEventListeners();
                document.body.style.cursor = 'default';
                _stage.update();
            }
        });

        registerCursorEvents(container);

        var taskItem = new createjs.Shape();
        taskItem.graphics
            .beginFill(task.colorCode).drawRoundRect(offsets.shape.x, (_tasks.length * offsets.shape.y) + offsets.shape.spacing, sizes.width, sizes.height, offsets.shape.radius)
            .beginStroke('#999999').drawRoundRect(offsets.shape.x, (_tasks.length * offsets.shape.y) + offsets.shape.spacing, sizes.width, sizes.height, offsets.shape.radius);
        container.addChild(taskItem);

        var taskText = new createjs.Text();
        taskText.font = _font;
        taskText.text = task.name;
        taskText.x = offsets.text.x;
        taskText.y = (_tasks.length * offsets.text.y) + offsets.text.spacing;
        container.addChild(taskText);

        var durationText = new createjs.Text();
        durationText.font = _font;
        durationText.text = task.duration + 'hr';
        durationText.x = offsets.duration.x;
        durationText.y = (_tasks.length * offsets.duration.y) + offsets.duration.spacing;
        container.addChild(durationText);

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