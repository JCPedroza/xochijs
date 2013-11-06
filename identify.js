// ===========================================
//                 Imports
// ===========================================
 var process  = require("./process");
 var formulas = require("./formulas");
 var sounds   = require("./sounds");

// ===========================================
//              Chord Recognition
// ===========================================

/** Identifies the name of a Chord object, returns an array of possible names. */
var chord = function(chord){
    if (typeof arguments[0] === "string")                                 // Case for variable arguments of type string.
        return _chordStringArray(Array.prototype.slice.call(arguments));  // Cast arguments object to array.
    else if (arguments[0] instanceof sounds.Note)
        return _chordNoteArray(Array.prototype.slice.call(arguments));
    else if (chord instanceof sounds.Chord)                               // Case for a chord represented as a Chord object.
        return _chordObject(chord);
    else if (chord instanceof Array){                                     // Cases for array argument:
        if (typeof chord[0] === "string")                                 // Case for a chord represented as an array of string.
            return _chordStringArray(chord);
        else if (chord[0] instanceof sounds.Note)                         // Case for a chord represented as an array of Note objects.
            return _chordNoteArray(chord);
    }
};

// Helper for chord(), deals with an array of Note objects.
var _chordNoteArray = function(chord){
    var nameArray = [];
    for (var i = 0; i < chord.length; i++)
        nameArray[i] = chord[i].getName();
    return _chordStringArray(nameArray);
};

// Helper for chord(), _chordObject, and _chordNoteArray. Deals with an array of strings.
var _chordStringArray = function(chord){
    var chordSize    = chord.length;
    var permutations = process.permute(chord);                                              // Array with all the permutations of the chord.
    var formula      = _getFormulas(chordSize);                                             // Determine a formula object to use.
    var returnArray  = [];                                                                  // Array that will be populated with possible names.
    for (var i = 0; i < permutations.length; i++){
        var current = process.toFormula(permutations[i]).slice(0, -1);                      // Last value in formula is not relevant. (1)
        var lowest  = permutations[i][0];                                                   // Lowest note, to determine root.
        for (var key in formula){                                                           // Loop through chord formulas.
            if (formula.hasOwnProperty(key))                                                // Checks property doesn't come from prototype.
                if (process.arraysEqual(current, formula[key][0]))                          // Checks for a match.
                    returnArray.push(_determineRoot(lowest, formula[key][1]) + " " + key);  // Add the name of the chord if a match is found.
        }
    }
    return returnArray;
};

// Helper for chord(), deals with Chord object.
var _chordObject = function(chord){
    chordNotes = chord.getNotes();                 // Get the notes from the Chord object.
    for (var i = 0; i < chordNotes.length; i++)
        chordNotes[i] = chordNotes[i].getName();   // Build an array with the name of the notes.
    return _chordStringArray(chordNotes);          // Call _chordStringArray with that array as argument.
};

// Helper for chord(). Determines formula object based on chord size.
var _getFormulas = function(chordSize){
    if      (chordSize  <  2) throw new Error("chordSize must be bigger than 1");
    else if (chordSize === 2) return formulas.twoNoteChords;
    else if (chordSize === 3) return formulas.threeNoteChords;
    else if (chordSize === 4) return formulas.fourNoteChords;
    else if (chordSize === 5) return formulas.fiveNoteChords;
};

// Helper for chords(). Determines a root note of the formula. It is used for no root chords.
var _determineRoot = function(lowest, offset){
    if (offset === 0) return lowest;                  // Is the chord rootless?
    var pool          = formulas.ET12POOL;            // The root is inside formulas.ET12POOL.
    var indexOfLowest = pool.indexOf(lowest);         // Search for the index of the lowest note in the chords.
    var indexOfRoot   = indexOfLowest + offset;       // Calculate the index of the root based on the offset.
    if (indexOfRoot < 0) indexOfRoot += pool.length;  // Correct the index if it's negative.
    var root          = pool[indexOfRoot];            // The root of the chord.
    return root;
};

// ===========================================
//          Chord Formula Recognition
// ===========================================

// !!! everything
/*
* Identifies a chord based on its formula.
* @param formula a sequence or array of numbers.
*/
var identifyChordFormula = function(formula){
    Array.prototype.slice.call(arguments);  // Cast to array.
};

// ===========================================
//                Node Exports
// ===========================================

exports.chord = chord;

// ===========================================
//                   Notes
// ===========================================

/*
* (1) Last value is not relevant because it's the number of half steps that connect the last note with
* the first note; that value is not used to determine the chord's quality.
*/
