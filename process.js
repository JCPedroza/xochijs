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

/** Builds an array with all the possible inversions of a Chord object. */
var buildInversions = function(chord){
    var chordCopy   = new sounds.Chord(chord.getNotes().slice(0));
    var chordSize   = chordCopy.getSize();
    var returnArray = [];
    for (var i = 0; i < chordSize; i++){
        returnArray.push(new sounds.Chord(chordCopy.getNotes().slice(0)));
        chordCopy.invert(1);
    }
    return returnArray;
};

/*+ Builds an array with all the permutations of a Chord object. */
var buildPermutations = function (chord){
    var chordNotes    = chord.getNotes().slice(0);  // Copy array of notes, the notes of the chord.
    var permutedArray = permute(chordNotes);        // Build an array of its permutations.
    var returnArray   = [];                         // Array that will be populated with Chord objects.
    for (var i in permutedArray)                    // Create a Chord object with each permutation.
        returnArray.push(new sounds.Chord(permutedArray[i]));
    return returnArray;                             // Return the array of Chord objects.
};

// Node exports:
exports.arraysEqual       = arraysEqual;
exports.permute           = permute;
exports.stepCount         = stepCount;
exports.scalize           = scalize;
exports.buildInversions   = buildInversions;
exports.buildPermutations = buildPermutations;
