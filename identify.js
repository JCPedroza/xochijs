/** @module identify */
/*jslint node: true */
"use strict";

// ===========================================
//                 Imports
// ===========================================
var processing  = require("./processing"),
    formulas    = require("./formulas"),
    sounds      = require("./sounds");

// ===========================================
//                Intervals
// ===========================================
/** Calculates the interval between two notes, as a number. */
var intervalValue = function (note1, note2, pool) {
    var thePool    = pool || formulas.ET12POOL;
    var result = thePool.indexOf(note1) - thePool.indexOf(note2);
    return result < 0 ? Math.abs(result) : Math.abs(result - thePool.length);

};

// ===========================================
//         Chord Recognition Testing
// ===========================================
// Chord must be an array of string
var identifyX = function (chord) {
    var root = chord[0];
};


// ===========================================
//              Chord Recognition
// ===========================================

// Helper for chord(). Determines formula object based on chord size.
var getFormulas = function (chordSize) {
    if (chordSize  <  2) {
        throw new Error("chordSize must be bigger than 1");
    }
    if (chordSize === 2) {
        return formulas.twoNoteChords;
    }
    if (chordSize === 3) {
        return formulas.threeNoteChords;
    }
    if (chordSize === 4) {
        return formulas.fourNoteChords;
    }
    if (chordSize === 5) {
        return formulas.fiveNoteChords;
    }
};

// Helper for chords(). Determines a root note of the formula. It is used for no root chords.
var determineRoot = function (lowest, offset) {
    if (offset === 0) {
        return lowest;                            // Is the chord rootless?
    }
    var pool, indexOfLowest, indexOfRoot, root;
    pool          = formulas.ET12POOL;            // The root is inside formulas.ET12POOL.
    indexOfLowest = pool.indexOf(lowest);         // Search for the index of the lowest note in the chords.
    indexOfRoot   = indexOfLowest + offset;       // Calculate the index of the root based on the offset.
    if (indexOfRoot < 0) {
        indexOfRoot += pool.length;               // Correct the index if it's negative.
    }
    root          = pool[indexOfRoot];            // The root of the chord.
    return root;
};

// Helper for chord(), chordObject, and chordNoteArray. Deals with an array of strings.
var chordStringArray = function (chord) {
    var i, key, current, lowest,
        chordSize    = chord.length,
        permutations = processing.permute(chord),                                           // Array with all the permutations of the chord.
        formula      = getFormulas(chordSize),                                              // Determine a formula object to use.
        returnArray  = [];                                                                  // Array that will be populated with possible names.
    for (i = 0; i < permutations.length; i += 1) {
        current = processing.toFormula(permutations[i]).slice(0, -1);                      // Last value in formula is not relevant. (1)
        lowest  = permutations[i][0];                                                      // Lowest note, to determine root.
        for (key in formula) {                                                              // Loop through chord formulas.
            if (formula.hasOwnProperty(key)) {                                              // Checks property doesn't come from prototype.
                if (processing.arraysEqual(current, formula[key][0])) {                     // Checks for a match.
                    returnArray.push(determineRoot(lowest, formula[key][1]) + " " + key);  // Add the name of the chord if a match is found.
                }
            }
        }
    }
    return returnArray;
};

// Helper for chord(), deals with an array of Note objects.
var chordNoteArray = function (chord) {
    var i,
        nameArray = [];
    for (i = 0; i < chord.length; i += 1) {   // Populate nameArray with the name property of each Note object.
        nameArray[i] = chord[i].getName();
    }
    return chordStringArray(nameArray);
};

// Helper for chord(), deals with Chord object.
var chordObject = function (chord) {
    var chordNotes = chord.getNotes();    // Get the notes from the Chord object.
    return chordNoteArray(chordNotes);   // Call chordNoteArray with that array of Note objects.         
};

/** 
* Chord name identification. 
* @param {...string|...Note|string[]|Note[]|Chord} chord A representation of a group of notes, datatypes supported are:
* variable arguments of type string or Note, Chord objects, arrays of string or arrays of Note objects.
* @returns An array of possible names for the chord, or the chord's formula if no names are found.
* @throws Will throw an error if the type of the argument is not supported.
*/
var chord = function (chord) {
    var returnArray = [];
    if (typeof arguments[0] === "string") {                               // Case for variable arguments of type string.
        returnArray = chordStringArray(Array.prototype.slice.call(arguments));  // Cast arguments object to array.
    } else if (arguments[0] instanceof sounds.Note) {                     // Case for variable arguments of type Note.
        returnArray = chordNoteArray(Array.prototype.slice.call(arguments));    // Cast arguments object to array.
    } else if (chord instanceof sounds.Chord) {                           // Case for a chord represented as a Chord object.
        returnArray = chordObject(chord);
    } else if (chord instanceof Array) {                                  // Cases for array argument:
        if (typeof chord[0] === "string") {                               // Case for a chord represented as an array of string.
            returnArray = chordStringArray(chord);
        } else if (chord[0] instanceof sounds.Note) {                     // Case for a chord represented as an array of Note objects.
            returnArray = chordNoteArray(chord);
        }
    } else {
        throw new Error("datatype is not supported");
    }
    if (returnArray.length === 0) {
        returnArray = processing.toFormula(chord);
    }
    return returnArray;
};

// ===========================================
//          Chord Formula Recognition
// ===========================================

// !!! everything
/*
* Identifies a chord based on its formula.
* @param formula a sequence or array of numbers.
*/
var identifyChordFormula = function (formula) {
    Array.prototype.slice.call(arguments);  // Cast to array.
};

// ===========================================
//                Node Exports
// ===========================================

exports.intervalValue = intervalValue;
exports.chord         = chord;

// ===========================================
//                   Notes
// ===========================================

/*
* (1) Last value is not relevant because it's the number of half steps that connect the last note with
* the first note; that value is not used to determine the chord's quality.
*/
