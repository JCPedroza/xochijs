var sounds   = require("./sounds");
var formulas = require("./formulas");

/** Used as default pool (equal temperament 12 semi-tones). */
var ET12POOL = ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"];

/** Checks equality between two arrays. */  // needs to handle nested arrays
var arraysEqual = function(a, b) {
  if (a === b)                  return true;
  if (a === null || b === null) return false;
  if (a.length != b.length)     return false;
  for (var i = 0; i < a.length; ++i)
    if (a[i] !== b[i]) return false;
  return true;
};

/** Generates an array that contains the permutations of the input array */
var permute = function(input) {
    var permArr = [],
    usedChars = [];
    function main(input){
        var i, ch;
        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length === 0) {
                permArr.push(usedChars.slice());
            }
            main(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr;
    }
    return main(input);
};

/** Counts the steps between two notes. */
var stepCount = function(note1, note2, pool){
    var thePool = pool || ET12POOL;
    var result  = thePool.indexOf(note2.getName()) - thePool.indexOf(note1.getName());
    if (result < 0) result += thePool.length;
    return result;
};

/** Builds a Scale object, based on a formula. */
var scalize = function(note, formula, pool){
    var thePool      = pool || ET12POOL;
    var noteArray    = [];
    var currentIndex = thePool.indexOf(note.getName());
    var poolSize     = thePool.length;
    for (var i in formula){
        noteArray.push(new sounds.Note(thePool[currentIndex]));
        currentIndex = (currentIndex + formula[i]) % poolSize;
    }
    return new sounds.Scale(noteArray);
};

/** Forms chords derived from the input scale, using superimposed thirds. */
var harmonize = function(scale, depth){
    if (depth < 1 || typeof depth !== "number")
        throw new Error("depth must be a number > 0");
    var chordArray = [];
    var notes      = scale.getNotes();
    var scaleSize  = scale.getSize();
    for(var i = 0; i < scaleSize; i++){                  // For every note in the scale:
        var aNoteArray = [];                             // Build a note array (a chord):
        for(var j = 0, k = 0; j < depth; j++, k += 2)    // With that note plus a number -
            aNoteArray[j] = notes[(k + i) % scaleSize];  // of superimposed thirds (depth).
        chordArray.push(new sounds.Chord(aNoteArray));   // Add that chord to chordList.
    }
    return new sounds.Harmony(chordArray);
};

/** Builds an array with all the possible inversions of a Chord object. */ // !!! needs to be tested
var buildInversions = function(chord){
    var chordCopy   = new sounds.Chord(chord.getNotes().slice(0));
    var chordSize   = chordCopy.getSize();
    var returnArray = [];
    returnArray.push(new sounds.Chord(chordCopy.getNotes().slice(0)));
    for (var i = 1; i < chordSize; i++){
        chordCopy.invert(1);
        returnArray.push(new sounds.Chord(chordCopy.getNotes().slice(0)));
    }
    return returnArray;
};

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
    var inversions  = buildInversions(trichord);                  // array with all the inversions of the chord
    var formula     = formulas.trichordFormulas;                  // trichord formulas
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

// Node exports:
exports.arraysEqual      = arraysEqual;
exports.permute          = permute;
exports.stepCount        = stepCount;
exports.scalize          = scalize;
exports.harmonize        = harmonize;
exports.buildInversions  = buildInversions;
exports.identifyChord    = identifyChord;
exports.identifyTrichord = identifyTrichord; //!!! only for tests, remove

