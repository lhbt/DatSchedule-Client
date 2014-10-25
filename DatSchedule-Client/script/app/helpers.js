define(function() {

    var lerpColor = function (sourceStart, sourceEnd, startColor, endColor, value) {
        var red = lerpValue(sourceStart, sourceEnd, startColor.r, endColor.r, value);
        var green = lerpValue(sourceStart, sourceEnd, startColor.g, endColor.g, value);
        var blue = lerpValue(sourceStart, sourceEnd, startColor.b, endColor.b, value);
        return { r: Math.floor(red), g: Math.floor(green), b: Math.floor(blue) };
    };

    var lerpValue = function(sourceStart, sourceEnd, destStart, destEnd, value) {
        return destStart + (destEnd - destStart) * ((value - sourceStart) / (sourceEnd - sourceStart));
    };

    return {
        LerpColor: lerpColor
    };

});