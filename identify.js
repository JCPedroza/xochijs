 var process  = require("./process");
 var formulas = require("./formulas");

// ===========================================
//              Chord Recognition
// ===========================================

/** Identifies the name of a Chord object, returns an array of possible names. */
var chord = function(chord){
    var chordSize    = chord.getSize();
    var permutations = process.buildPermutations(chord);            // Array with all the permutations of the chord.
    var formula      = getFormulas(chordSize);                      // Determine a formula object to use.
    var returnArray  = [];                                          // Array that will be populated with possible names.
    for (var i = 0; i < permutations.length; i++){
        var current = permutations[i].toFormula().slice(0, -1);     // Last value in formula is not relevant. (1)
        var lowest  = permutations[i].getNotes()[0].getName();      // Lowest note, to determine root.
        for (var key in formula){                                   // Loop through chord formulas.
            if (formula.hasOwnProperty(key)){                       // Checks property doesn't come from prototype.
                if (process.arraysEqual(current, formula[key][0]))  // Checks for a match.
                    returnArray.push(lowest + " " + key);           // Add lowest note and key if there is a match.
            }
        }
    }
    return returnArray;
};

// Helper for chord(). Determines formula object based on chord size.
var getFormulas = function(chordSize){
    if      (chordSize === 2) return formulas.twoNoteChords;
    else if (chordSize === 3) return formulas.threeNoteChords;
    else if (chordSize === 4) return formulas.fourNoteChords;
    else if (chordSize === 5) return formulas.fiveNoteChords;
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
