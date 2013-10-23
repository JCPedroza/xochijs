 var process  = require("./process");
 var formulas = require("./formulas");

// ===========================================
//              Chord Recognition
// ===========================================

// !!! needs datatype that ties formula number and note name
/** Identifies the name of a Chord object, returns an array of possible names. */
var identifyChord = function(chord){
    var chordSize = chord.getSize();
    if (chordSize === 3) return identifyTrichord(chord);
};

/** 
* Helper for identifyChord. 
* Currently identifies major, minor, augmented, and diminished triads, and
* suspended 4th, suspended 2nd chords.
*/
var identifyTrichord = function(trichord){
    var inversions  = process.buildInversions(trichord);        // Array with all the inversions of the chord.
    var formula     = formulas.trichordFormulas;                // Trichord formulas.
    var returnArray = [];                                       // Array that will be populated with possible names.
    for (var i = 0; i < 3; i++){
        var current = inversions[i].toFormula().slice(0, -1);   // Last value in formula is not relevant.
        var lowest  = inversions[i].getNotes()[0].getName();    // Lowest note, to determine root.
        for (var key in formula){                               // Loop through trichord formulas.
            if (formula.hasOwnProperty(key)){                   // Checks property doesn't come from prototype.
                if (process.arraysEqual(current,formula[key]))  // Checks for a match.
                    returnArray.push(lowest + " " + key);       // Add lowest note and key if there is a match.
            }
        }
    }
    return returnArray;                                         // Return the array with the possible names.
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

// Node exports:
exports.identifyChord = identifyChord;
