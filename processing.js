/* jslint node: true */
"use strict";

// ===========================================
//                 Imports
// ===========================================
var sounds   = require("./sounds");
var formulas = require("./formulas");

/** Checks equality between two arrays. */  // needs to handle nested arrays
var arraysEqual = function(a, b) {
    var i;
    if (a === b)                  return true;
    if (a === null || b === null) return false;
    if (a.length != b.length)     return false;
    if (typeof a[0] !== "object"){
        for (i = 0; i < a.length; i += 1){
            if (a[i] !== b[i]) {
                return false;
            }
        }
    } else {
        for (i = 0; i < a.length; i += 1){
            if (!a[i].equals(b[i])) {
                return false;
            }
        }
    }
  return true;
};

/** Generates an array that contains the permutations of the input array. */
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
    var thePool = pool || formulas.ET12POOL;
    var result  = thePool.indexOf(note2.getName()) - thePool.indexOf(note1.getName());
    if (result < 0) result += thePool.length;
    return result;
};

/** Builds a Scale object, based on a formula. */
var scalize = function(note, formula, pool){
    var thePool      = pool || formulas.ET12POOL;
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

/** Builds an array with all the permutations of a Chord object. */
var buildPermutations = function (chord){
    var chordNotes    = chord.getNotes().slice(0);  // Copy array of notes, the notes of the chord.
    var permutedArray = permute(chordNotes);        // Build an array of its permutations.
    var returnArray   = [];                         // Array that will be populated with Chord objects.
    for (var i in permutedArray)                    // Create a Chord object with each permutation.
        returnArray.push(new sounds.Chord(permutedArray[i]));
    return returnArray;                             // Return the array of Chord objects.
};

// ===========================================
//                 toFormula
// ===========================================
// !!! needs to handle NoteCOllection objects (you need to take a different OOP approach)
/** 
* Returns the formula of the provided sequence of notes. 
* If variable arguments, the last argument must be the pool.
*/
var toFormula = function(notes, pool){
    if (typeof arguments[0] === "string")               // Case for var args of type string.
        return _toFormulaVarArgs(arguments, "string");
    if (arguments[0] instanceof sounds.Note)            // Case for var args of type note.
        return _toFormulaVarArgs(arguments, "Note");
    if (notes instanceof Array){                        // Cases for arrays.
        if (typeof notes[0] === "string")               // Case for array of string.
            return _toFormulaStringArray(notes, pool);
        if (notes[0] instanceof sounds.Note)            // Case for array of Note.
            return _toFormulaNoteArray(notes, pool);
    }
    if (notes instanceof sounds.NoteCollection)         // Case for NoteCollection types.
        // return _toFormulaNC(notes, pool);
        return notes.toFormula(pool);
    else throw new TypeError("datatype is not supported");
};

// Helper for toFormula, handles NOteCollection types.
// var _toFormulaNC = function(notes, pool){
//     var thePool = pool || formulas.ET12POOL;
// };

// Helper for toFormula, handles variable arguments of type string.
var _toFormulaVarArgs = function(){
    var type         = arguments[1];
    var theArguments = Array.prototype.slice.call(arguments[0]);                 // Cast arguments to array.
    var hasPool      = theArguments[theArguments.length - 1] instanceof Array;   // Is the last index a pool?
    var pool         = hasPool ? theArguments.pop() : formulas.ET12POOL;         // Assign a pool.
    if (type === "string")                                                       // Case for string array.
        return _toFormulaStringArray(theArguments, pool);
    if (type === "Note")                                                         // Case for Note array.
        return _toFormulaNoteArray(theArguments, pool);
};

// Helper for _toFormulaVarArgs, deals with variable arguments of type Note.
var _toFormulaNoteArray = function(notes, pool){
    for (var i = 0; i < notes.length; i++)       // From array of Note to array of Note.name.
        notes[i] = notes[i].getName();
    return _toFormulaStringArray(notes, pool);   // Call _toFormulaStringArray with the new array.
};

// Helper for toFormula, _toFormulaNoteArray, and _toFormulaVarArgsString; handles array of strings. 
var _toFormulaStringArray = function(notes, pool){
    var thePool     = pool || formulas.ET12POOL;
    var returnArray = [];
    var notesLength = notes.length;
    var poolLength  = thePool.length;
    for (var i = 0; i < notesLength; i++){
        if (thePool.indexOf(notes[i]) === -1)      // Checks that the note is in the pool.
            throw new Error(notes[i] + " is not in the pool.");
        var value = thePool.indexOf(notes[i]) - thePool.indexOf(notes[(i + 1) % notesLength]);
        if (value > 0) value -= poolLength;
        returnArray.push(Math.abs(value));
    }
    return returnArray;
};

// ===========================================
//             fromFormulaToNotes
// ===========================================
// !!! needs to handle var args, and in that case firstNote and pool are the default values.
/** Returns the note representaiton of a formula. */
var fromFormulaToNotes = function(formula, firstNote, pool){
    pool              = pool || formulas.ET12POOL;  // A pool of notes.
    firstNote         = firstNote || pool[0];       // The note group will be buildt with this note as reference.
    var currentIndex  = pool.indexOf(firstNote);    // To keep track of the position in the pool.
    var steps         = formula.length + 1;         // Number of steps needed to complete.
    var poolLength    = pool.length;                // Length of the pool.
    var returnArray  = [];                          // Will be populated with the results.
    for (var i = 0; i < steps; i++){                // Iterate through the pool and formula, collecting the results.
        returnArray.push(pool[currentIndex]);
        currentIndex = (currentIndex + formula[i]) % poolLength;
    }
    return returnArray;                             // Return the results as an array.
};


// Node exports:
exports.arraysEqual        = arraysEqual;
exports.permute            = permute;
exports.stepCount          = stepCount;
exports.scalize            = scalize;
exports.buildInversions    = buildInversions;
exports.buildPermutations  = buildPermutations;
exports.toFormula          = toFormula;
exports.fromFormulaToNotes = fromFormulaToNotes;
