var sounds   = require("./sounds");
var identify = require("./identify");

/** 
* Builds chords derived from the input scale, using superimposed thirds.
* @param scale  A scale object that will be used as reference.
* @param depth   
* @param option 0: returns a Harmony object, 1: returns an array of strings.
*/
var harmonize = function(scale, depth, option){
    if (depth < 1 || typeof depth !== "number")
        throw new Error("depth must be a number > 0");
    if (option < 0 || option > 1)
        throw new Error("option must be number 0 or 1");
    var mode = option || 0;
    if (mode === 0) return harmonize0(scale, depth, [], scale.getNotes(), scale.getSize());
    if (mode === 1) return harmonize1(scale, depth, [], scale.getNotes(), scale.getSize());
};

// Helper for harmonize(), returns a Harmony object.
var harmonize0 = function(scale, depth, chordArray, notes, scaleSize){
    for (var i = 0; i < scaleSize; i++){                 // For every note in the scale:
        var aNoteArray = [];                             // Build a note array (a chord):
        for(var j = 0, k = 0; j < depth; j++, k += 2)    // With that note plus a number -
            aNoteArray[j] = notes[(k + i) % scaleSize];  // of superimposed thirds (depth).
        chordArray.push(new sounds.Chord(aNoteArray));   // Add that chord to chordList.
    }
    return new sounds.Harmony(chordArray);               // Return an Harmony object
};

// Helper for harmonize(), returns an array of strings with the names of the chords, if applicable.
// !!! can be more efficient, it doesn't need to call harmonize0 or deal with objects. 
var harmonize1 = function(scale, depth, chordArray, notes, scaleSize){
    var chords      = harmonize0(scale, depth, chordArray, notes, scaleSize).getChords();
    var chlength    = chords.length;
    var returnArray = [];
    for (var i = 0; i < chlength; i++)
        returnArray.push(identify.chord(chords[i]));
    return returnArray;
};

// Node exports:
exports.harmonize = harmonize;