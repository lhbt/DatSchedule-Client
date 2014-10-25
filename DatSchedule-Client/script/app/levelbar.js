define(['easel'], function() {

    var _stage;
    var _levelBars = 0;

    var sizes = {
        x: 10,
        y: 200
    };

    var createBar = function(stage, name) {
        _stage = stage;

        var bartext = new createjs.Text();
        bartext.x = 630 + (_levelBars * 50);
        bartext.y = 300;
        bartext.text = name;
        _stage.addChild(bartext);

        var bar = new createjs.Shape();
        bar.name = name;
        bar.index = _levelBars;
        bar.graphics
            .beginLinearGradientFill(["#00FF00", "#FFFF00", "#FF0000"], [0, 0.8, 1], 0, bartext.y - 10 - sizes.y, 0, bartext.y - 10)
            .drawRect(bartext.x + 7, bartext.y - 10 - sizes.y, sizes.x, sizes.y)
            .endFill();
        _stage.addChild(bar);

        var barOutline = new createjs.Shape();
        barOutline.graphics
            .beginStroke("#AAAAAA")
            .setStrokeStyle(2)
            .drawRect(bartext.x + 7, bartext.y - 10 - sizes.y, sizes.x, sizes.y)
            .endStroke();
        _stage.addChild(barOutline);

        _stage.update();

        _levelBars++;
    }

    var updateBar = function (name, value) {
        var bar = _stage.getChildByName(name);
        var x = 630 + (bar.index * 50) + 7;
        var y = 290 - (sizes.y * value / 100);
        var width = 10;
        var height = sizes.y * value / 100;
        bar.graphics
            .clear()
            .beginLinearGradientFill(["#00FF00", "#FFFF00", "#FF0000"], [0, 0.8, 1], 0, 290 - sizes.y, 0, 290)
            .drawRect(x, y, width, height)
            .endFill()
            .endStroke();
        _stage.update();
    };

    return {
        CreateBar: createBar,
        UpdateBar: updateBar
    };

});