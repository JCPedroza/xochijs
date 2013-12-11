/** @module typeCheck */
/*jslint node: true */
"use strict";

// Imports:

var sounds = require("./sounds");

// ===========================================
//                checkString 
// ===========================================
var checkString = function (arg) {
    if (typeof arg !== "string" && arg !== undefined) {
        throw new TypeError("argument must be of type string");
    }
};

// ===========================================
//                checkArray
// ===========================================
var checkArray = function (arg) {
    if (!Array.isArray(arg) && arg !== undefined) {
        throw new TypeError("argument must be of type Array");
    }
};

// ===========================================
//             checkStringArray 
// ===========================================
var checkStringArray = function (arg) {
    if ((!Array.isArray(arg) && arg !== undefined) ||
            (typeof arg[0] !== "string")) {
        throw new TypeError("argument must be an array of string");
    }
};

// ===========================================
//             checkNumberArray 
// ===========================================
var checkNumberArray = function (arg) {
    if ((!Array.isArray(arg) && arg !== undefined) ||
            (typeof arg[0] !== "number")) {
        throw new TypeError("argument must be an array of number");
    }
};

// ===========================================
//             checkNoteCollection
// ===========================================
var checkNoteCollection = function (arg) {
    if (!(arg instanceof sounds.NoteCollection)) {
        throw new TypeError("argument must be of type NoteCollection");
    }
};

// ===========================================
//                checkNote
// ===========================================
var checkNote = function (arg) {
    if (!(arg instanceof sounds.Note)) {
        throw new TypeError("argument must be of type Note");
    }
};

// node exports
exports.checkString              = checkString;
exports.checkArray               = checkArray;
exports.checkStringArray         = checkStringArray;
exports.checkNumberArray         = checkNumberArray;
exports.checkNoteCollection      = checkNoteCollection;
exports.checkNote                = checkNote;

// -----------------
//      Notes
// -----------------

// Undefined check: used to handle optional arguments.

