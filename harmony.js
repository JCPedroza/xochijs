var sounds   = require("./sounds");
var identify = require("./identify");

/** 
* Builds chords derived from the input scale, using superimposed thirds.
* 
*/
var harmonize = function(scale, depth, option){
    if (depth < 1 || typeof depth !== "number")
        throw new Error("depth must be a number > 0");
    var mode = option || 0;
    if (mode === 0) return harmonize0(scale, depth, [], scale.getNotes(), scale.getSize());
    if (mode === 1) return harmonize1(scale, depth);
};

// Helper for harmonize(), returns an Harmony object.
var harmonize0 = function(scale, depth, chordArray, notes, scaleSize){
    for (var i = 0; i < scaleSize; i++){                 // For every note in the scale:
        var aNoteArray = [];                             // Build a note array (a chord):
        for(var j = 0, k = 0; j < depth; j++, k += 2)    // With that note plus a number -
            aNoteArray[j] = notes[(k + i) % scaleSize];  // of superimposed thirds (depth).
        chordArray.push(new sounds.Chord(aNoteArray));   // Add that chord to chordList.
    }
    return new sounds.Harmony(chordArray);               // Return an Harmony object
};

// !!! everything
// Helper for harmonize(), returns an array of strings.
var harmonize1 = function(scale, depth, chordArray, notes, scaleSize){
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