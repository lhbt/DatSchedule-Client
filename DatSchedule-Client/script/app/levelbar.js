define(['app/helpers', 'easel'], function(helpers) {

    var _stage;
    var _levelBars = 0;

    var sizes = { x: 10, y: 200};
    var fullBarColor = { r: 0, g: 255, b: 0 };
    var emptyBarColor = { r: 255, g: 0, b: 0 };

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
        bar.graphics.beginFill("#00ff00").beginStroke("#000000").drawRect(bartext.x + 7, bartext.y - 10 - sizes.y, sizes.x, sizes.y).endStroke().endFill();
        _stage.addChild(bar);

        _stage.update();

        _levelBars++;
    };

    var updateBar = function(name, value) {
        var bar = _stage.getChildByName(name);
        var barColor = helpers.LerpColor(0, 100, emptyBarColor, fullBarColor, value);
        var color = createjs.Graphics.getRGB(barColor.r, barColor.g, barColor.b);
        bar.graphics
            .clear()
            .beginFill(color)
            .beginStroke("#000000")
            .drawRect(630 + (bar.index * 50) + 7, 290 - (sizes.y * value / 100), 10, sizes.y * value / 100)
            .endStroke()
            .endFill();

        _stage.update();
    };

    return {
        CreateBar: createBar,
        UpdateBar: updateBar
    };

});