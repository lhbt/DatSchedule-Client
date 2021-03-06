﻿define(['easel'], function() {

    var _stage;
    var _levelBars = 0;

    var _linearGradientColors = ["#00FF00", "#FFFF00", "#FF0000"];
    var _linearGradientThresholds = [0, 0.8, 1];

    var _font = "14px Candara";

    var _parentXPosition;

    var sizes = {
        x: 20,
        y: 200,
        radius: 10
    };

    var createBar = function(stage, name, parentXPosition) {
        _stage = stage;
        _parentXPosition = parentXPosition;

        var bartext = new createjs.Text();
        bartext.x = _parentXPosition + 30 + (_levelBars * 50);
        bartext.y = 300;
        bartext.text = name;
        bartext.font = _font;
        _stage.addChild(bartext);

        var bar = new createjs.Shape();
        bar.name = name;
        bar.index = _levelBars;
        bar.graphics
            .beginLinearGradientFill(_linearGradientColors, _linearGradientThresholds, 0, bartext.y - 10 - sizes.y, 0, bartext.y - 10)
            .drawRoundRect(bartext.x + 7, bartext.y - 10 - sizes.y, sizes.x, sizes.y, sizes.radius)
            .endFill();
        _stage.addChild(bar);

        var barOutline = new createjs.Shape();
        barOutline.graphics
            .beginStroke("#AAAAAA")
            .setStrokeStyle(2)
            .drawRoundRect(bartext.x + 7, bartext.y - 10 - sizes.y, sizes.x, sizes.y, sizes.radius)
            .endStroke();
        _stage.addChild(barOutline);

        _stage.update();

        _levelBars++;
    }

    var updateBar = function (name, value) {
        var bar = _stage.getChildByName(name);
        var x = _parentXPosition + 30 + (bar.index * 50) + 7;
        var y = 290 - (sizes.y * value / 100);
        var width = sizes.x;
        var height = sizes.y * value / 100;
        bar.graphics
            .clear()
            .beginLinearGradientFill(["#00FF00", "#FFFF00", "#FF0000"], [0, 0.8, 1], 0, 290 - sizes.y, 0, 290)
            .drawRoundRect(x, y, width, height, sizes.radius)
            .endFill()
            .endStroke();
        _stage.update();
    };

    return {
        CreateBar: createBar,
        UpdateBar: updateBar
    };

});