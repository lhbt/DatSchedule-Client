define(['app/measurements', 'easel'], function(measurements) {

    var _stage;
    var _currentPosition = measurements.stageWidth;
    var _nightPanel;
    var _animationSpeed = 6;

    var init = function (stage) {
        _stage = stage;
        //_nightPanel = new createjs.Shape();
        //_nightPanel.graphics
        //    .beginFill('#000000')
        //    .drawRect(_currentPosition, 0, measurements.stageWidth, measurements.stageHeight)
        //    .endFill();
        _nightPanel = new createjs.Bitmap("../content/night.jpg");
        _nightPanel.x = _currentPosition;
        _nightPanel.y = 0;
        _nightPanel.width = measurements.stageWidth;
        _nightPanel.height = measurements.stageHeight;
        _stage.addChild(_nightPanel);
    }

    var slideIn = function (callback) {
        _stage.removeChild(_nightPanel);
        _stage.addChild(_nightPanel);
        slideInHelper(callback);
    }

    function slideInHelper(callback) {
        if (_currentPosition < 0) {
            return callback();
        }
        _currentPosition -= _animationSpeed;
        //_nightPanel.graphics
        //    .clear()
        //    .beginFill('#000000')
        //    .drawRect(_currentPosition, 0, measurements.stageWidth, measurements.stageHeight)
        //    .endFill();
        _nightPanel.x = _currentPosition;
        _stage.update();
        setTimeout(slideInHelper, 10, callback);
    }

    var slideOut = function(callback) {
        slideOutHelper(callback);
    }

    function slideOutHelper(callback) {
        if (_currentPosition < -measurements.stageWidth) {
            reset();
            return callback();
        }
        _currentPosition -= _animationSpeed;
        //_nightPanel.graphics
        //    .clear()
        //    .beginFill('#000000')
        //    .drawRect(_currentPosition, 0, measurements.stageWidth, measurements.stageHeight)
        //    .endFill();
        _nightPanel.x = _currentPosition;
        _stage.update();
        setTimeout(slideOutHelper, 10, callback);
    }

    function reset() {
        _currentPosition = measurements.stageWidth;
    }

    return {
        Init: init,
        SlideIn: slideIn,
        SlideOut: slideOut
    }
});