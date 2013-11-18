
/** @module sounds */
/* jslint node: true */
"use strict";

// =========================================================================
//                               Imports
// =========================================================================
var formulas   = require("./formulas");

// =========================================================================
//                                Note
// =========================================================================

/**
* Represents a musical note. 
* Supports object specifier as argument.
* @constructor
* @param name   The name of the note (optional).
* @param freq   Frequency of the note (optional).
* @param octave Index/octave of the note (optional).
* @param name2  Secondary name of the note (optional).
* @returns A Note object.
*/
var Note = function Note (name, freq, octave, name2) {
    this._octave = octave || arguments[0]["octave"] || 0;
    this._freq   = freq   || arguments[0]["freq"]   || 0;
    this._name2  = name2  || arguments[0]["name2"]  || "";
    // Typecheck for "object" to handle object specifier.
    this._name   = typeof name === "string" ?
                   name : arguments[0]["name"] || "";
};

// ------------------------
//         Mutators
// ------------------------

/** Sets name. */
Note.prototype.setName = function (newName) {
    this._name = newName;
    return this;
};

/** Sets octave. */
Note.prototype.setOctave = function (newOctave) {
    this._octave = newOctave;
    return this;
};

/** Sets freq. */
Note.prototype.setFreq = function (newFreq) {
    this._freq = newFreq;
    return this;
};

/** Sets the secondary name (name2). */
Note.prototype.setName2 = function (newName2) {
    this._name2 = newName2;
    return this;
};

// ------------------------
//        Accessors
// ------------------------

/** Returns the primitive value of the object, used by the + operator. */
Note.prototype.valueOf = function () {
    return this._freq;
};

/** Returns name. */
Note.prototype.getName = function () {
    return this._name;
};

/** Returns octave. */
Note.prototype.getOctave = function () {
    return this._octave;
};

/** Returns freq. */
Note.prototype.getFreq = function () {
    return this._freq;
};

/** Returns secondary name (name2). */
Note.prototype.getName2 = function () {
    return this._name2;
};

/** Returns the object state as a string. */
Note.prototype.toString = function () {
    return "name=" + this._name + " name2=" + this._name2 +
           " freq=" + this._freq + " octave=" + this._octave;
};

// ------------------------
//      Other Methods
// ------------------------

/** Creates a copy of this. */
Note.prototype.copy = function () {
    return new Note(this._name, this._freq, this._octave, this._name2);
};

/** Checks equality. */
Note.prototype.equals = function (that) {
    if (typeof that !== "object" || that.constructor.name !== this.constructor.name){
        return false;
    }
    return that.getName()   === this._name    && that.getFreq()  === this._freq &&
           that.getOctave() === this._octave  && that.getName2() === this._name2;
};

// =========================================================================
//                              NoteCollection
// =========================================================================

/**
* Represents a group of notes. 
* Parent constructor for Chord and Scale.
* @constructor
* @param notes An array of Note objects.
* @param name  Name for the NoteCollection (optional).
* @param name2 Secondary name for the NoteCollection (optional).
*/
var NoteCollection = function NoteCollection (notes, name, name2) {
    this._name   = name  || arguments[0]["name"]  || "";
    this._name2  = name2 || arguments[0]["name2"] || "";
    // Typecheck to handle object specifiers:
    this._notes  = notes instanceof Array ? notes : arguments[0]["notes"] || [];
    this._notes2 = this._notes.slice(0);            // !!! Should this be deep copy?
};

// ------------------------
//         Mutators
// ------------------------

/** Change the notes. */
NoteCollection.prototype.setNotes = function (notes) {
    if (!(notes instanceof Array)){
        throw new Error("notes must be an array of Note");
    }
    this._notes = notes;
    return this;
};

/** Adds one note. */
NoteCollection.prototype.addNote = function (note) {
    if (!(note instanceof Note)){
        throw new Error("note must be a Note object");
    }
    this._notes.push(note);
    return this;
};

/** Changes the name of the NoteCollection object. */
NoteCollection.prototype.setName = function (newName) {
    this._name = newName;
    return this;
};

/** Changes the secondary name of the NoteCollection object. */
NoteCollection.prototype.setName2 = function (newName) {
    this._name2 = newName;
    return this;
};

/** Resets notes to its original state (notes2). */
NoteCollection.prototype.reset = function () {
    this._notes = this._notes2.slice(0);
    return this;
};

/** Sends the first note to the last index. */  // !!! Can this be more efficient?
NoteCollection.prototype.rotate = function () {
    this._notes.push(this._notes.shift());
    return this;
};

/** Sends the last note to the first index. */  // !!! Can this be more efficient?
NoteCollection.prototype.rotateBack = function () {
    this._notes.unshift(this._notes.pop());
    return this;
};

/** Reverses the order of the notes. */
NoteCollection.prototype.reverse = function () {
    this._notes.reverse();
    return this;
};

/** Removes the note at given index. */
NoteCollection.prototype.removeNoteAt = function (index) {
    if (index < 0) {
        throw new Error("index must be greater than 0");
    }
    this._notes.splice(index, 1);
    return this;
};

/** Removes all the notes with given name. */
NoteCollection.prototype.removeNotesWithName = function (name) {
    this._notes = this._notes.filter(
        function(element) {
            return element.getName() !== name;
        });
    return this;
};

/** Removes all the notes with given secondary name (name2). */
NoteCollection.prototype.removeNotesWithName2 = function (name) {
    this._notes = this._notes.filter(
        function(element) {
            return element.getName2() !== name;
        });
    return this;
};

/** Removes all the notes with given frequency. */
NoteCollection.prototype.removeNotesWithFreq = function (freq) {
    this._notes = this._notes.filter(
        function(element) {
            return element.getFreq() !== freq;
        });
    return this;
};

/** Removes all the notes within a frequency range, inclusive. */
NoteCollection.prototype.removeNotesWithFreqRange = function (fromFreq, toFreq) {
    this._notes = this._notes.filter(
        function(element) {
            var thisFreq = element.getFreq();
            return thisFreq < fromFreq || thisFreq > toFreq;
        });
    return this;
};

// ------------------------
//        Accessors
// ------------------------

/** Returns the object state as a string. */
NoteCollection.prototype.toString = function () {
    var i,
        j,
        returnString = "name=" + this._name + "\nname2=" + this._name2 + "\nsize=" + this.getSize();

    returnString += "\nnotes=\n";
    for (i in this._notes) {
        returnString += ("<" + this._notes[i].toString() + ">");
    }
    returnString += "\nnotes2=\n";
    for (j in this._notes2) {
        returnString += ("<" + this._notes2[j].toString() + ">");
    }
    return returnString;
};

/** Retunrs the size of the string NoteCollection. */
NoteCollection.prototype.getSize = function () {
    return this._notes.length;
};

/** Returns the notes. */
NoteCollection.prototype.getNotes = function () {
    return this._notes;
};

/** Returns the original notes. */
NoteCollection.prototype.getOriginalNotes = function () {
    return this._notes2;
};

/** Returns name. */
NoteCollection.prototype.getName = function () {
    return this._name;
};

/** Returns secondary name (name2) */
NoteCollection.prototype.getName2 = function () {
    return this._name2;
};

/** Returns the name of the notes as a string. */
NoteCollection.prototype.getNotesAsString = function () {
    var note,
        returnString = "";
    for (note in this._notes) {
        returnString += this._notes[note].getName() + " ";
    }
    return returnString;
};

/** Returns the name of the original notes as a string. */
NoteCollection.prototype.getOriginalNotesAsString = function () {
    var note,
        returnString = "";
    for (note in this._notes2) {
        returnString += this._notes2[note].getName() + " ";
    }
    return returnString;
};

/** Returns the frequencies of the notes as a string. */
NoteCollection.prototype.getFreqsAsString = function () {
    var note,
        returnString = "";
    for (note in this._notes) {
        returnString += this._notes[note].getFreq() + " ";
    }
    return returnString;
};

/** Builds an array of the indexes the notes have in a pool. */
NoteCollection.prototype.toIndexes = function (pool) {
    var note,
        thePool = pool || formulas.ET12POOL,
        returnArray = [];
    for (note in this._notes) {
        returnArray.push(thePool.indexOf(this._notes[note].getName()));
    }
    return returnArray;
};

/** Builds a formula based on the indexes the notes have in a pool. */ // !!! this can be more efficient
NoteCollection.prototype.toFormula = function (pool) {
    var i,
        sum,
        thePool       = pool || formulas.ET12POOL,
        indexArray    = this.toIndexes(pool),
        returnArray   = [],
        formulaLength = indexArray.length,
        poolLength    = thePool.length;
    for (i = 0; i < formulaLength; i++) {
        sum = indexArray[i] - indexArray[(i + 1) % formulaLength];
        if (sum > 0) {
            sum -= poolLength;
        }
        returnArray.push(Math.abs(sum));
    }
    return returnArray;
};

// ------------------------
//      Other Methods
// ------------------------

/** Creates a swallow copy of this. */
NoteCollection.prototype.copy = function () {
    return new NoteCollection(this._notes, this._name, this._name2);
};

/** Creates a deep copy of this. */
NoteCollection.prototype.deepCopy = function () {
    var index,
        thisNotes = this._notes,
        thatNotes = [],
        length    = thisNotes.length;
    for (index = 0; index < length; index += 1) {
        thatNotes.push(thisNotes[index].copy());
    }
    return new NoteCollection(thatNotes, this._name, this._name2);
};

/** Checks equality bewteen this._notes and a Note array. */
NoteCollection.prototype.noteEquals = function (thatNotes) {
    if (!(thatNotes instanceof Array) || !(thatNotes[0] instanceof Note)){
        return false;
    }
    return this._noteArrayEquals(thatNotes, this._notes);
};

/** Checks equality, without including this._notes2. */
NoteCollection.prototype.equals = function (that) {
    if (typeof that !== "object" || that.constructor.name !== this.constructor.name){
        return false;
    }
    return this._name === that.getName() && this._name2 === that.getName2() &&
           this.noteEquals(that.getNotes());
};

/** Checks equality, including this._notes2. */
NoteCollection.prototype.strictEquals = function (that) {
    return this.equals(that) &&
           this._noteArrayEquals(that.getOriginalNotes(), this.getOriginalNotes());
};

// Helper for this.equals and this.strictEquals.
NoteCollection.prototype._noteArrayEquals = function (thatNotes, thisNotes) {
    var index,
    thatLength = thatNotes.length;
    if (thatLength !== thisNotes.length) {
        return false;
    }
    for (index = 0; index < thatLength; index += 1) {
        if (!thatNotes[index].equals(thisNotes[index])) {
            return false;
        }
    }
    return true;
};


// =========================================================================
//                                Chord
// =========================================================================

/**
* Represents a group of notes as a Chord. 
* Inherits fron NoteCollection.
* @constructor
* @param notes An array of Note objects.
* @param name  Name for the NoteCollection (optional).
* @param name2 Secondary name for the NoteCollection (optional).
*/
var Chord = function Chord (notes, name, name2) {
    NoteCollection.apply(this, arguments);  // inherits from NoteCollection
};

// ------------------------
//       Inheritance
// ------------------------

Chord.prototype = Object.create(NoteCollection.prototype);
Chord.prototype.constructor = Chord;

// ------------------------
//         Mutators
// ------------------------

/** Sets notes to nth inversion. Sets to previous inversions if n is negative. */ // !!! can this be done more efficiently?
Chord.prototype.invert = function (n) {
    if (typeof(n) !== "number") throw new Error("n must be a number");
    if (n > 0)
        for (var i = 0; i < n; i++)
            this.rotate();
    if (n < 0)
        for (var j = 0; j > n; j--)
            this.rotateBack();
    return this;
};

/** 
* Sets notes to nth inversion, using the original notes (notes2) as reference. 
* Sets to previous inversions if n is negative.
*/
Chord.prototype.invertOriginal = function (n) {
    if (typeof(n) !== "number") throw new Error("n must be of type number");
    this.reset();
    this.invert(n);
    return this;
};

// =========================================================================
//                                Scale
// =========================================================================

/** 
* Group of Note objects with melodic dynamics (like a succession of notes).
*
* @constructor
*/
var Scale = function Scale (notes, name, name2) {
    NoteCollection.apply(this, arguments);  // inherits from NoteCollection
};

// ------------------------
//       Inheritance
// ------------------------

Scale.prototype = Object.create(NoteCollection.prototype);
Scale.prototype.constructor = Scale;

// =========================================================================
//                            ChordCollection
// =========================================================================

/** 
* Represents a group of chords 
* @constructor
*/
var ChordCollection = function ChordCollection (chords, name, name2) {
    // if (!(chords instanceof Array)) throw new Error("chords must be an array of Chord"); !!! this needs to work with prototype inheritance!!!!
    this._name   = name  || "";
    this._name2  = name2 || "";
    this._chords = chords;
};

// ------------------------
//         Mutators
// ------------------------

ChordCollection.prototype.setChords = function (newChords) {
    if (!(newChords instanceof Array)) throw new Error("chords must be an array of Chord");
    this._chords = newChords;
    return this;
};

// ------------------------
//        Accessors
// ------------------------

ChordCollection.prototype.getSize = function(){
    return this._chords.length;
};

ChordCollection.prototype.getChords = function(){
    return this._chords;
};

ChordCollection.prototype.getChordsNames = function(){
    var returnString = "";
    for (var i in this._chords)
        returnString += this._chords[i]._name + " ";
    return returnString;
};

ChordCollection.prototype.getChordsNotesAsString = function(){
    var returnString = "";
    for (var i in this._chords)
        returnString += "< " + this._chords[i].getNotesAsString() + "> ";
    return returnString;
};

ChordCollection.prototype.toString = function(){
    var returnString = "name=" + this._name + "\nname2=" + this._name2 + "\nsize=" + this.getSize();
    returnString += "\n\nchords= ";
    for (var i in this._chords){
        returnString += "\n<<<\n";
        returnString += this._chords[i].toString();
        returnString += "\n>>>";
    }
    return returnString;
};

// =========================================================================
//                                Harmony
// =========================================================================

/**
* Represents a group of chords.
* @constructor
*/
var Harmony = function Harmony (chords, name, name2){
    ChordCollection.apply(this, arguments);  // Inherits from ChordCollection.
};

// ------------------------
//       Inheritance
// ------------------------

Harmony.prototype = Object.create(ChordCollection.prototype);
Harmony.prototype.constructor = Harmony;



// =========================================================================
//                              Node Exports
// =========================================================================

exports.Note            = Note;
exports.NoteCollection  = NoteCollection;
exports.Chord           = Chord;
exports.Scale           = Scale;
exports.ChordCollection = ChordCollection;
exports.Harmony         = Harmony;

// =========================================================================
//                                Notes
// =========================================================================

// Object Specifier:
// An object literal as function argument. The order of the key-value pairs
// doesn't matter. This improves readability and removes restrictions in the
// default argument dynamic.
// Example:
// var aNote = new Note("note1", 400);                  // normal way
// var bNote = new Note({name: "note1", freq: "400"});  // object specifier way
// What if we only want to give the note a name and name2, while using default
// arguments for the other members? With the normal way we would need to 
// provide values for those members. With object specifiers we don't need to.
// var cNote = new Note("note3", undefined, undefined, "altname3");  // normal way
// var dNote = new Note("note4", 0, 0, "altname4");                  // normal way
// var eNore = new NOte({name: "note5", name2: "altname5"});         // object specifier way
// Constructors are designed to handle either case.
