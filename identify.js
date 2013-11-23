/** @module identify */
/* jslint node: true */
"use strict";

// ===========================================
//                 Imports
// ===========================================
 var processing  = require("./processing");
 var formulas = require("./formulas");
 var sounds   = require("./sounds");

// ===========================================
//              Chord Recognition
// ===========================================

/** 
* Chord name identification. 
* @param {...string|...Note|string[]|Note[]|Chord} chord A representation of a group of notes, datatypes supported are:
* variable arguments of type string or Note, Chord objects, arrays of string or arrays of Note objects.
* @returns An array of possible names for the chord, or the chord's formula if no names are found.
* @throws Will throw an error if the type of the argument is not supported.
*/
var chord = function(chord){
    var returnArray = [];
    if (typeof arguments[0] === "string")                              // Case for variable arguments of type string.
        returnArray = _chordStringArray(Array.prototype.slice.call(arguments));  // Cast arguments object to array.
    else if (arguments[0] instanceof sounds.Note)                      // Case for variable arguments of type Note.
        returnArray = _chordNoteArray(Array.prototype.slice.call(arguments));    // Cast arguments object to array.
    else if (chord instanceof sounds.Chord)                            // Case for a chord represented as a Chord object.
        returnArray = _chordObject(chord);
    else if (chord instanceof Array){                                  // Cases for array argument:
        if (typeof chord[0] === "string")                              // Case for a chord represented as an array of string.
            returnArray = _chordStringArray(chord);
        else if (chord[0] instanceof sounds.Note)                      // Case for a chord represented as an array of Note objects.
            returnArray = _chordNoteArray(chord);
    }
    else throw new Error("datatype is not supported");
    if (returnArray.length === 0) returnArray = processing.toFormula(chord);
    return returnArray;
};

// Helper for chord(), _chordObject, and _chordNoteArray. Deals with an array of strings.
var _chordStringArray = function(chord){
    var chordSize    = chord.length;
    var permutations = processing.permute(chord);                                              // Array with all the permutations of the chord.
    var formula      = _getFormulas(chordSize);                                             // Determine a formula object to use.
    var returnArray  = [];                                                                  // Array that will be populated with possible names.
    for (var i = 0; i < permutations.length; i++){
        var current = processing.toFormula(permutations[i]).slice(0, -1);                      // Last value in formula is not relevant. (1)
        var lowest  = permutations[i][0];                                                   // Lowest note, to determine root.
        for (var key in formula){                                                           // Loop through chord formulas.
            if (formula.hasOwnProperty(key))                                                // Checks property doesn't come from prototype.
                if (processing.arraysEqual(current, formula[key][0]))                          // Checks for a match.
                    returnArray.push(_determineRoot(lowest, formula[key][1]) + " " + key);  // Add the name of the chord if a match is found.
        }
    }
    return returnArray;
};

// Helper for chord(), deals with an array of Note objects.
var _chordNoteArray = function(chord){
    var nameArray = [];
    for (var i = 0; i < chord.length; i++)   // Populate nameArray with the name property of each Note object.
        nameArray[i] = chord[i].getName();
    return _chordStringArray(nameArray);
};

// Helper for chord(), deals with Chord object.
var _chordObject = function(chord){
    var chordNotes = chord.getNotes();        // Get the notes from the Chord object.
    return _chordNoteArray(chordNotes);   // Call _chordNoteArray with that array of Note objects.         
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
