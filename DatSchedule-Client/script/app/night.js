define(['app/measurements', 'easel'], function(measurements) {

    var _stage;
    var _currentPosition = measurements.stageWidth;
    var _nightPanel;
    var _animationSpeed = 6;
    var _text;
    var _moreText;

    var _font = "48px Candara";
    var _moreFont = "64px Candara";

    var _linearGradientColors = ["#252629", "#131521"];
    var _linearGradientThresholds = [0, 1];

    var init = function(stage) {
        _stage = stage;
        _nightPanel = new createjs.Shape();
        _nightPanel.graphics
            .beginLinearGradientFill(_linearGradientColors, _linearGradientThresholds, 0, 0, 0, measurements.stageHeight)
            .drawRect(_currentPosition, 0, measurements.stageWidth, measurements.stageHeight)
            .endFill();
        _stage.addChild(_nightPanel);
    }

    var slideIn = function(callback) {
        _stage.removeChild(_nightPanel);
        _stage.addChild(_nightPanel);
        slideInHelper(callback);
    }

    function slideInHelper(callback) {
        if (_currentPosition < 0) {
            showText();
            return callback();
        }
        _currentPosition -= _animationSpeed;
        _nightPanel.graphics
            .clear()
            .beginLinearGradientFill(_linearGradientColors, _linearGradientThresholds, 0, 0, 0, measurements.stageHeight)
            .drawRect(_currentPosition, 0, measurements.stageWidth, measurements.stageHeight)
            .endFill();
        _stage.update();
        setTimeout(slideInHelper, 10, callback);
    }

    function showText() {
        _text = new createjs.Text();
        _text.font = _font;
        _text.color = "#444444";
        _text.text = "It's night time, get some rest";
        _text.x = 150;
        _text.y = 200;
        _stage.addChild(_text);
        _stage.update();
        setTimeout(showMoreText, 2000);
    }

    function showMoreText() {
        _moreText = new createjs.Text();
        _moreText.font = _moreFont;
        _moreText.color = "#555555";
        _moreText.text = "Too late.";
        _moreText.x = 150;
        _moreText.y = 400;
        _stage.addChild(_moreText);
        _stage.update();
    }

    var slideOut = function(callback) {
        hideText();
        slideOutHelper(callback);
    }

    function hideText() {
        _stage.removeChild(_text);
        _stage.removeChild(_moreText);
        _stage.update();
    }

    function slideOutHelper(callback) {
        if (_currentPosition < -measurements.stageWidth) {
            reset();
            return callback();
        }
        _currentPosition -= _animationSpeed;
        _nightPanel.graphics
            .clear()
            .beginLinearGradientFill(_linearGradientColors, _linearGradientThresholds, 0, 0, 0, measurements.stageHeight)
            .drawRect(_currentPosition, 0, measurements.stageWidth, measurements.stageHeight)
            .endFill();
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