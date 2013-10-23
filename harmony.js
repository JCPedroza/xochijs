var sounds = require("./sounds");

/** 
* Forms chords derived from the input scale, using superimposed thirds.
* 
*/
var harmonize = function(scale, depth, option){
    if (depth < 1 || typeof depth !== "number")
        throw new Error("depth must be a number > 0");
    var mode = option || 0;
    if (mode === 0) return harmonize0(scale, depth);
    if (mode === 1) return harmonize1(scale, depth);
};

// Helper for harmonize(), returns an Harmony object.
var harmonize0 = function(scale, depth){
    var chordArray = [];
    var notes      = scale.getNotes();
    var scaleSize  = scale.getSize();
    for (var i = 0; i < scaleSize; i++){                 // For every note in the scale:
        var aNoteArray = [];                             // Build a note array (a chord):
        for(var j = 0, k = 0; j < depth; j++, k += 2)    // With that note plus a number -
            aNoteArray[j] = notes[(k + i) % scaleSize];  // of superimposed thirds (depth).
        chordArray.push(new sounds.Chord(aNoteArray));   // Add that chord to chordList.
    }
    return new sounds.Harmony(chordArray);
};

// Helper for harmonize(), returns an Harmony object.
var harmonize1 = function(scale, depth){
    var chordArray = [];
    var notes      = scale.getNotes();
    var scaleSize  = scale.getSize();
    for (var i = 0; i < scaleSize; i++){                 // For every note in the scale:
        var aNoteArray = [];                             // Build a note array (a chord):
        for(var j = 0, k = 0; j < depth; j++, k += 2)    // With that note plus a number -
            aNoteArray[j] = notes[(k + i) % scaleSize];  // of superimposed thirds (depth).
        chordArray.push(new sounds.Chord(aNoteArray));   // Add that chord to chordList.
    }
    return new sounds.Harmony(chordArray);
};

// Node exports:
exports.harmonize = harmonize;