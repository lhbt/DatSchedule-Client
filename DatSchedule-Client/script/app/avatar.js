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

        var avatar = new createjs.Bitmap(_images[imageName]);
        avatar.x = 225;
        avatar.y = 100;
        _avatarContainer.addChild(avatar);

        _stage.update();
    }

    var update = function(data) {
        if (data.gameState.stressLevel < 50) {
            setAvatar("stressed");
        }
        else if (data.gameState.fatigueLevel < 50) {
            setAvatar("tired");
        }
        else if (data.gameState.hungerLevel < 50) {
            setAvatar("hungry");
        }
    };

    return {
        Init: init,
        Update: update
    };

});