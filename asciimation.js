function load(s)
{
    var lines = s.split('\n');
    if (lines[0] != '#!/usr/bin/env ASCIImation') {
        return null;
    }
    var sep = lines[1];
    var height = null;
    for (var i = 2; i < lines.length; i++) {
        if (lines[i].substring(0, sep.length+1) == sep+' ') {
            height = i-2;
            break;
        }
    }
    var a = [];
    for (var i = 0; i < (lines.length-3)/(height+1); i++) {
        var i_sep = 1 + (height+1)*(i+1);
        var f = {};
        f.duration = lines[i_sep].substring(sep.length+1);
        f.frame = lines.slice(i_sep-height, i_sep).join('\n');
        a.push(f);
    }
    return a;
}

function play(element, asciimation_string)
{
    var a = load(asciimation_string);
    var pos = -1;
    var next_image = function() {
        pos++;
        if (pos >= a.length) {
            return;
        }
        element.textContent = a[pos].frame;
        setTimeout(next_image, a[pos].duration * 1000);
    }
    next_image();
}
