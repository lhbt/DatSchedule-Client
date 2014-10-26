define(function() {

    var _labelFont = "24px Candara";
    var _textFont = "30px Candara";

    var _stage;

    var _levelText;
    var _scoreText;

    var init = function(stage) {
        _stage = stage;

        var levelLabel = new createjs.Text();
        levelLabel.font = _labelFont;
        levelLabel.x = 210;
        levelLabel.y = 10;
        levelLabel.text = "Level:";
        _stage.addChild(levelLabel);

        var scoreLabel = new createjs.Text();
        scoreLabel.font = _labelFont;
        scoreLabel.x = 450;
        scoreLabel.y = 10;
        scoreLabel.text = "Score:";
        _stage.addChild(scoreLabel);

        _levelText = new createjs.Text();
        _levelText.font = _textFont;
        _levelText.x = 280;
        _levelText.y = 10;
        _levelText.text = "1";
        _stage.addChild(_levelText);

        _scoreText = new createjs.Text();
        _scoreText.font = _textFont;
        _scoreText.x = 520;
        _scoreText.y = 10;
        _scoreText.text = "0";
        _stage.addChild(_scoreText);
    };
    
    var update = function(data) {
        _levelText.text = data.currentLevel;
        _scoreText.text = data.totalScore;
        _stage.update();
    };

    return {
        Init: init,
        Update: update
    };

});