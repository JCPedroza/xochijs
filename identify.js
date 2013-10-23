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
    var inversions  = buildInversions(trichord);               // array with all the inversions of the chord
    var formula     = formulas.trichordFormulas;               // trichord formulas
    var returnArray = [];                                      // array that will be populated with possible names
    for (var i = 0; i < 3; i++){
        var current = inversions[i].toFormula().slice(0, -1);  // last value in formula is not relevant
        var lowest  = inversions[i].getNotes()[0].getName();   // lowest note, to determine root
        for (var key in formula){                              // loop through trichord formulas
            if (formula.hasOwnProperty(key)){                  // checks property doesn't come from prototype
                if (arraysEqual(current,formula[key]))         // checks for a match
                    returnArray.push(lowest + " " + key);      // add lowest note and key if there is a match
            }
        }
    }
    return returnArray;                                        // return the array with the possible names
};

exports.identifyChord    = identifyChord;
exports.identifyTrichord = identifyTrichord; //!!! only for tests, remove