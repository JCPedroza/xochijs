/* jslint node: true */
"use strict";

// ===========================================
//                 Imports
// ===========================================
var sounds   = require("./sounds"),
    formulas = require("./formulas"),
    type     = require("./type");

/** Checks equality between two arrays. */  // needs to handle nested arrays
var arraysEqual = function (a, b) {
    type.checkArray(a);
    type.checkArray(b);
    var i;
    if (a === b) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }
    if (a.length !== b.length) {
        return false;
    }
    if (typeof a[0] !== "object") {
        for (i = 0; i < a.length; i += 1) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
    } else {
        for (i = 0; i < a.length; i += 1) {
            if (!a[i].equals(b[i])) {
                return false;
            }
        }
    }
    return true;
};

/** Generates an array that contains the permutations of the input array. */
var permute = function (input) {
    type.checkArray(input);
    var permArr = [],
        usedChars = [];
    function main(input) {
        var i,
            ch;
        for (i = 0; i < input.length; i += 1) {
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
var stepCount = function (note1, note2, pool) {
    type.checkNote(note1);
    type.checkNote(note2);
    type.checkArray(pool);
    var thePool = pool || formulas.ET12POOL,
        result  = thePool.indexOf(note2.getName()) - thePool.indexOf(note1.getName());
    if (result < 0) {
        result += thePool.length;
    }
    return result;
};

/** Builds a Scale object, based on a formula. */
var scalize = function (note, formula, pool) {
    type.checkNote(note);
    type.checkNumberArray(formula);
    type.checkArray(pool);
    var index,
        thePool       = pool || formulas.ET12POOL,
        noteArray     = [],
        currentIndex  = thePool.indexOf(note.getName()),
        poolSize      = thePool.length,
        formulaLength = formula.length;
    for (index = 0; index < formulaLength; index += 1) {
        noteArray.push(new sounds.Note(thePool[currentIndex]));
        currentIndex = (currentIndex + formula[index]) % poolSize;
    }
    return new sounds.Scale(noteArray);
};

/** Builds an array with all the possible inversions of a Chord object. */
var buildInversions = function (chord) {
    type.checkNoteCollection(chord);
    var i,
        chordCopy   = new sounds.Chord(chord.getNotes().slice(0)),
        chordSize   = chordCopy.getSize(),
        returnArray = [];
    for (i = 0; i < chordSize; i += 1) {
        returnArray.push(new sounds.Chord(chordCopy.getNotes().slice(0)));
        chordCopy.invert(1);
    }
    return returnArray;
};

/** Builds an array with all the permutations of a Chord object. */
var buildPermutations = function (chord) {
    type.checkNoteCollection(chord);
    var index,
        chordNotes    = chord.getNotes().slice(0),  // Copy array of notes, the notes of the chord.
        permutedArray = permute(chordNotes),        // Build an array of its permutations.
        permutedArrayLength = permutedArray.length,
        returnArray   = [];                         // Array that will be populated with Chord objects.
    for (index = 0; index < permutedArrayLength; index += 1) {  // Create a Chord object with each permutation.
        returnArray.push(new sounds.Chord(permutedArray[index]));
    }
    return returnArray;                             // Return the array of Chord objects.
};

// ===========================================
//                 toFormula
// ===========================================

// !!! what is this?
// Helper for toFormula, handles NOteCollection types.
// var _toFormulaNC = function(notes, pool){
//     var thePool = pool || formulas.ET12POOL;
// };


// Helper for toFormula, toFormulaNoteArray, and toFormulaVarArgsString; handles array of strings. 
var toFormulaStringArray = function (notes, pool) {
    var i,
        value,
        thePool     = pool || formulas.ET12POOL,
        returnArray = [],
        notesLength = notes.length,
        poolLength  = thePool.length;
    for (i = 0; i < notesLength; i += 1) {
        if (thePool.indexOf(notes[i]) === -1) {      // Checks that the note is in the pool.
            throw new Error(notes[i] + " is not in the pool.");
        }
        value = thePool.indexOf(notes[i]) - thePool.indexOf(notes[(i + 1) % notesLength]);
        if (value > 0) {
            value -= poolLength;
        }
        returnArray.push(Math.abs(value));
    }
    return returnArray;
};

// Helper for toFormulaVarArgs, deals with variable arguments of type Note.
var toFormulaNoteArray = function (notes, pool) {
    var i;
    for (i = 0; i < notes.length; i += 1) {      // From array of Note to array of Note.name.
        notes[i] = notes[i].getName();
    }
    return toFormulaStringArray(notes, pool);   // Call toFormulaStringArray with the new array.
};

// Helper for toFormula, handles variable arguments of type string.
var toFormulaVarArgs = function () {
    var type         = arguments[1],
        theArguments = Array.prototype.slice.call(arguments[0]),                 // Cast arguments to array.
        hasPool      = theArguments[theArguments.length - 1] instanceof Array,   // Is the last index a pool?
        pool         = hasPool ? theArguments.pop() : formulas.ET12POOL;         // Assign a pool.
    if (type === "string") {                                                     // Case for string array.
        return toFormulaStringArray(theArguments, pool);
    }
    if (type === "Note") {                                                       // Case for Note array.
        return toFormulaNoteArray(theArguments, pool);
    }
};

// !!! needs to handle NoteCOllection objects (you need to take a different OOP approach)
/** 
* Returns the formula of the provided sequence of notes. 
* If variable arguments, the last argument must be the pool.
*/
var toFormula = function (notes, pool) {
    if (typeof arguments[0] === "string") {              // Case for var args of type string.
        return toFormulaVarArgs(arguments, "string");
    }
    if (arguments[0] instanceof sounds.Note) {           // Case for var args of type note.
        return toFormulaVarArgs(arguments, "Note");
    }
    if (notes instanceof Array) {                        // Cases for arrays.
        if (typeof notes[0] === "string") {              // Case for array of string.
            return toFormulaStringArray(notes, pool);
        }
        if (notes[0] instanceof sounds.Note) {           // Case for array of Note.
            return toFormulaNoteArray(notes, pool);
        }
    }
    if (notes instanceof sounds.NoteCollection) {        // Case for NoteCollection types.
        return notes.toFormula(pool);
    }
    throw new TypeError("datatype is not supported");
};



// ===========================================
//             fromFormulaToNotes
// ===========================================
/** Returns the note representaiton of a formula. */
var fromFormulaToNotes = function (formula, firstNote, pool) {
    type.checkNumberArray(formula);
    type.checkArray(pool);
    var formulaIndex,
        thePool       = pool || formulas.ET12POOL,
        // The note group will be built with this note as the starting note:
        theFirstNote  = firstNote || thePool[0],
        poolIndex     = thePool.indexOf(theFirstNote),
        steps         = formula.length + 1,
        poolLength    = thePool.length,
        returnArray   = [];
    if (poolIndex === -1) {
        throw new Error("firstNote not found in pool");
    }
    for (formulaIndex = 0; formulaIndex < steps; formulaIndex += 1) {
        returnArray.push(thePool[poolIndex]);
        poolIndex = (poolIndex + formula[formulaIndex]) % poolLength;
    }
    return returnArray;
};

// ===========================================
//             objectArrayEquals
// ===========================================
/** Checks for equality in an array of objects using equals method. */
var objectArrayEquals = function (a, b) {
    type.checkArray(a);
    type.checkArray(b);
    var index,
        aLength = a.length;
    if (aLength !== b.length) {
        return false;
    }
    for (index = 0; index < aLength; index += 1) {
        if (!a[index].equals(b[index])) {
            return false;
        }
    }
    return true;
};

// ===========================================
//           createArrayDeepCopy
// ===========================================
/** 
* Creates a deep copy of an array .
* (objects in the array need a copy or deepCopy method)
*/
var createArrayDeepCopy = function (theArray) {
    type.checkArray(theArray);
    var index,
        deepCopy = [],
        length = theArray.length;
    for (index = 0; index < length; index += 1) {
        deepCopy.push(theArray[index].deepCopy ?
                      theArray[index].deepCopy() :
                      theArray[index].copy());
    }
    return deepCopy;
};

// ===========================================
//              turnNoteToValue
// ===========================================
/** Converts a note into a value. */
var turnNoteToValue = function (note) {
    type.checkString(note);
    var index,
        modifier,
        nameLength = note.length,
        firstChar  = note[0],
        poolSize   = 12,
        value      = formulas.ET12POOL.indexOf(firstChar);
    if (value === "undefined") {
        throw new Error("note " + note + " not found in pool");
    }
    if (nameLength > 1) {
        for (index = 1; index < nameLength; index += 1) {
            modifier = note[index];
            if (modifier === "#") {
                value = (value + 1) % poolSize;
            } else if (modifier === "b") {
                value -= 1;
                if (value < 0) {
                    value += poolSize;
                }
            } else {
                throw new Error("modifier " + modifier + " is not supported");
            }
        }
    }
    return value;
};

// ===========================================
//             turnNotesToValues
// ===========================================
/** Converts a note array into a value array. */
var turnNotesToValues = function (noteNameArray) {
    type.checkStringArray(noteNameArray);
    var index,
        notesLength = noteNameArray.length,
        returnArray = [];
    for (index = 0; index < notesLength; index += 1) {
        returnArray.push(turnNoteToValue(noteNameArray[index]));
    }
    return returnArray;
};

// ===========================================
//                  toFlat
// ===========================================
/** Converts a sharp note into its enharmonic flat. */
var toFlat = function (note) {
    type.checkString(note);
    if (note.length !== 2 || note[1] !== "#") {
        throw new Error("note format must be: X# (note name and a sharp)");
    }
    var pool = formulas.ET12POOL;
    return pool[(pool.indexOf(note[0]) + 1) % 12];
};

// ===========================================
//                   toFlats
// ===========================================
/** Converts all the sharps in an array of note names to their enharmonic flat. */
var toFlats = function (notes) {
    type.checkStringArray(notes);
    var index,
        length      = notes.length,
        returnArray = [];
    for (index = 0; index < length; index += 1) {
        returnArray.push(toFlat(notes[index]));
    }
    return returnArray;
};

// ===========================================
//                   toSharp
// ===========================================
/** Converts a flat note into its enharmonic sharp equivalent. */ // 
var toSharp = function (note) {
    type.checkString(note);
    if (note.length !== 2 || note[1] !== "b") {
        throw new Error("note format must be: Xb (note name and a flat)");
    }
    var newNote,
        poolLength = 12,
        value      = turnNoteToValue(note) - 1;
    if (value < 0) {
        value += poolLength;
    }
    newNote = formulas.ET12POOL[value] + "#";
    if (newNote.length === 3) {
        newNote = newNote[0];
    }
    return newNote;
};

// ===========================================
//                   sort
// ===========================================
/** Returns a sorted copy of an array of note names. */
var sort = function (noteNameArray) {
    type.checkStringArray(noteNameArray);
    return noteNameArray.slice().sort(function (a, b) {
        var aValue = turnNoteToValue(a),
            bValue = turnNoteToValue(b);
        if (aValue < bValue) {
            return -1;
        }
        if (aValue > bValue) {
            return 1;
        }
        return 0;
    });
};

// ===========================================
//             withoutDuplicates
// ===========================================
//!!! this can be more eficient, delete iterating backwards instead
var withoutDuplicates = function (noteNameArray) {
    type.checkStringArray(noteNameArray);
    var i,
        j,
        k,
        newArray = noteNameArray.slice(0),
        returnArray = [],
        length   = newArray.length;
    for (i = 0; i < length; i += 1) {
        for (j = i + 1; j < length; j += 1) {
            if (newArray[i] === newArray[j] && i !== j) {
                newArray[j] = undefined;
            }
        }
    }
    for (k = 0; k < length; k += 1) {
        if (newArray[k]) {
            returnArray.push(newArray[k]);
        }
    }
    return returnArray;
};

// ===========================================
//                   clean
// ===========================================
/** Sorts and changes the names of the notes using enharmonics to avoid repeats. */
// !!! needs to handle multiple modifiers
// !!! is it handling chromaticism? more tests are needed
var clean = function (noteNameArray) {
    type.checkStringArray(noteNameArray);
    var index,
        modifier,
        next,
        noDups   = withoutDuplicates(noteNameArray),
        newArray = sort(noDups),
        length   = newArray.length,
        steps    = length - 1;
    for (index = 0; index < steps; index += 1) {
        next = newArray[index + 1];
        if (newArray[index][0] === next[0]) {
            modifier  = next[1];
            if (modifier) {
                if (modifier === "#") {
                    newArray[index + 1] = toFlat(next);
                } else if (modifier === "b") {
                    newArray[index + 1] = toSharp(next);
                } else {
                    throw new Error("modifier is not supported");
                }

            }
        }
    }
    return newArray;
};

// Node exports:
exports.arraysEqual         = arraysEqual;
exports.permute             = permute;
exports.stepCount           = stepCount;
exports.scalize             = scalize;
exports.buildInversions     = buildInversions;
exports.buildPermutations   = buildPermutations;
exports.toFormula           = toFormula;
exports.fromFormulaToNotes  = fromFormulaToNotes;
exports.objectArrayEquals   = objectArrayEquals;
exports.createArrayDeepCopy = createArrayDeepCopy;
exports.toFlat              = toFlat;
exports.toFlats             = toFlats;
exports.toSharp             = toSharp;
exports.turnNoteToValue     = turnNoteToValue;
exports.turnNotesToValues   = turnNotesToValues;
exports.clean               = clean;
exports.sort                = sort;
exports.withoutDuplicates   = withoutDuplicates;