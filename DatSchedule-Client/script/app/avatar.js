define(function() {

    var _stage;

    var _avatarContainer;
    var _images = {
        "happy": "../../content/happy.png",
        "stressed": "../../content/stressed.png",
        "tired": "../../content/tired.png",
        "hungry": "../../content/hungry.png"
    };

    var init = function(stage) {
        _stage = stage;

        _avatarContainer = new createjs.Container();
        _stage.addChild(_avatarContainer);
        
        setAvatar("happy");
    };
    
    var setAvatar = function (imageName) {

        _avatarContainer.removeAllChildren();

        var img = new Image();
        img.src = _images[imageName];
        img.onload = imageLoaded;

        _stage.update();
    }

    function imageLoaded(e) {
        var bmp = new createjs.Bitmap(e.target);
        bmp.x = 225;
        bmp.y = 100;
        _avatarContainer.addChild(bmp);
        _stage.update();
    }

    var update = function(data) {
        if (data.gameState.stressLevel < 50 || data.gameState.fatigueLevel < 50 || data.gameState.hungerLevel < 50) {
            if (data.gameState.stressLevel <= data.gameState.fatigueLevel && data.gameState.stressLevel <= data.gameState.hungerLevel) {
                setAvatar("stressed");
            } else if (data.gameState.fatigueLevel <= data.gameState.stressLevel && data.gameState.fatigueLevel <= data.gameState.hungerLevel) {
                setAvatar("tired");
            } else if (data.gameState.hungerLevel <= data.gameState.stressLevel && data.gameState.hungerLevel <= data.gameState.fatigueLevel) {
                setAvatar("hungry");
            }
        } else {
            setAvatar("happy");
        }
    };

    return {
        Init: init,
        Update: update
    };

});