define(['app/measurements', 'easel'], function (measurements) {

    var _offset = 100;
    var _radius = 20;
    var _stage;

    var _positions = {
        gameOverText: {
            x:300,
            y:100
        },
        image: {
            x: 150,
            y: 150
        }
    }

    var _gameOverFont = "36px Candara";
    var _messageTextFont = "24px Candara";

    var _textColor = '#FFFFFF';

    var init = function(stage) {
        _stage = stage;
    }

    var show = function (data) {
        var background = new createjs.Shape();
        background.alpha = 0.5;
        background.graphics
            .beginFill('#000000')
            .drawRect(0, 0, measurements.stageWidth, measurements.stageHeight)
            .endFill();

        _stage.addChild(background);

        var displayPanel = new createjs.Shape();
        displayPanel.graphics
            .beginFill('#535772')
            .drawRoundRect(_offset, _offset, measurements.stageWidth - (2*_offset), measurements.stageHeight - (2*_offset), _radius)
            .endFill();

        _stage.addChild(displayPanel);

        var gameOverText = new createjs.Text();
        gameOverText.text = "Game Over";
        gameOverText.font = _gameOverFont;
        gameOverText.color = _textColor;
        gameOverText.x = _positions.gameOverText.x;
        gameOverText.y = _positions.gameOverText.y;
        _stage.addChild(gameOverText);

        var img = new Image();
        img.src = "../content/death.png";
        img.onload = showDeathImage;

        var messageText = new createjs.Text();
        messageText.font = _messageTextFont;
        messageText.color = _textColor;
        messageText.text = data.message;
        messageText.lineWidth = (measurements.stageWidth - (2 * _offset)) / 2 - _offset;
        messageText.x = measurements.stageWidth/ 2;
        messageText.y = 2 * _offset; 
        _stage.addChild(messageText);

        _stage.update();
    }

    function showDeathImage(e) {
        var bmp = new createjs.Bitmap(e.target);
        bmp.x = _positions.image.x;
        bmp.y = _positions.image.y;
        _stage.addChild(bmp);
        _stage.update();
    }

    return {
        Show: show,
        Init: init
    }
});