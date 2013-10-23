 var process  = require("./process");
 var formulas = require("./formulas");

// ===========================================
//              Chord Recognition
// ===========================================

// !!! needs datatype that ties formula number and note name
/** Identifies the name of a Chord object, returns an array of possible names. */
var chord = function(chord){
    var chordSize = chord.getSize();
    if (chordSize === 3) return identifyTrichord(chord);
};

// Helper for chord(), deals with trichords.
var identifyTrichord = function(trichord){
    var permutations = process.buildPermutations(trichord);      // Array with all the permutations of the chord.
    var formula      = formulas.threeNoteChords;                  // Trichord formulas.
    var returnArray  = [];                                       // Array that will be populated with possible names.
    for (var i = 0; i < permutations.length; i++){
        var current = permutations[i].toFormula().slice(0, -1);  // Last value in formula is not relevant.
        var lowest  = permutations[i].getNotes()[0].getName();   // Lowest note, to determine root.
        for (var key in formula){                                // Loop through trichord formulas.
            if (formula.hasOwnProperty(key)){                    // Checks property doesn't come from prototype.
                if (process.arraysEqual(current,formula[key]))   // Checks for a match.
                    returnArray.push(lowest + " " + key);        // Add lowest note and key if there is a match.
            }
        }
    }
    return returnArray;                                          // Return the array with the possible names.
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
exports.chord = chord;
