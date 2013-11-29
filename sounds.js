/** @module sounds */
/*jslint node: true */
"use strict";



// =========================================================================
//                               Imports
// =========================================================================
var formulas   = require("./formulas"),
    processing = require("./processing");

// =========================================================================
//                                Note
// =========================================================================

/**
* Represents a musical note. 
* @constructor
* @param name   The name of the note (optional).
* @param freq   Frequency of the note (optional).
* @param octave Index/octave of the note (optional).
* @param name2  Secondary name of the note (optional).
*/
var Note = function Note(name, freq, octave, name2) {
    // Typechecking is to handle: no arguments, object specifier, and 
    // default values. The name argument can be the name of the note or
    // an object specifier or undefined.
    this.octave = octave || (name && name.octave) || 0;
    this.freq   = freq   || (name && name.freq)   || 0;
    this.name2  = name2  || (name && name.name2)  || "";
    this.name   = typeof name === "string" ?
                   name :
                   (name && name.name) || "";
};

// ------------------------
//         Mutators
// ------------------------

/** Sets name. */
Note.prototype.setName = function (newName) {
    this.name = newName;
    return this;
};

/** Sets octave. */
Note.prototype.setOctave = function (newOctave) {
    this.octave = newOctave;
    return this;
};

/** Sets freq. */
Note.prototype.setFreq = function (newFreq) {
    this.freq = newFreq;
    return this;
};

/** Sets the secondary name (name2). */
Note.prototype.setName2 = function (newName2) {
    this.name2 = newName2;
    return this;
};

// ------------------------
//        Accessors
// ------------------------

/** Returns the primitive value of the object, used by the + operator. */
Note.prototype.valueOf = function () {
    return this.freq;
};

/** Returns name. */
Note.prototype.getName = function () {
    return this.name;
};

/** Returns octave. */
Note.prototype.getOctave = function () {
    return this.octave;
};

/** Returns freq. */
Note.prototype.getFreq = function () {
    return this.freq;
};

/** Returns secondary name (name2). */
Note.prototype.getName2 = function () {
    return this.name2;
};

/** Returns a string representation of this. */
Note.prototype.toString = function () {
    var theName = this.name;
    if (this.name2 !== "") {
        theName += (" " + this.name2);
    }
    return "<" + theName + ">";
};

/** Returns the object state as a string. */
Note.prototype.toStringDetailed = function () {
    return "name=" + this.name + " name2=" + this.name2 +
           " freq=" + this.freq + " octave=" + this.octave;
};

// ------------------------
//      Other Methods
// ------------------------

/** Creates a copy of this. */
Note.prototype.copy = function () {
    return new this.constructor(this.name, this.freq, this.octave, this.name2);
};

/** Checks equality. */
Note.prototype.equals = function (that) {
    if (typeof that !== "object" || that.constructor.name !== this.constructor.name) {
        return false;
    }
    return that.getName()   === this.name    && that.getFreq()  === this.freq &&
           that.getOctave() === this.octave  && that.getName2() === this.name2;
};

// =========================================================================
//                              NoteCollection
// =========================================================================

/**
* Represents a group of notes. 
* Parent constructor for Chord and Scale.
* @constructor
* @param notes An array of Note objects (optional).
* @param name  Name for the NoteCollection (optional).
* @param name2 Secondary name for the NoteCollection (optional).
*/
var NoteCollection = function NoteCollection(notes, name, name2) {
    // Typechecking is to handle: no arguments, object specifier, and 
    // default values. Notes can be an array of Note, an object specifier, 
    // or undefined.
    this.name   = name  || (notes && notes.name)  || "";
    this.name2  = name2 || (notes && notes.name2) || "";
    this.notes  = notes instanceof Array ?
                   notes :
                   (notes && notes.notes) || [];
    this.notes2 = this.notes.slice(0);            // !!! Should this be deep copy?
};

// ------------------------
//         Mutators
// ------------------------

/** Change the notes. */
NoteCollection.prototype.setNotes = function (notes) {
    if (!(notes instanceof Array)) {
        throw new Error("notes must be an array of Note");
    }
    this.notes = notes;
    return this;
};

/** Adds one note. */
NoteCollection.prototype.addNote = function (note) {
    if (!(note instanceof Note)) {
        throw new Error("note must be a Note object");
    }
    this.notes.push(note);
    return this;
};

/** Changes the name of the NoteCollection object. */
NoteCollection.prototype.setName = function (newName) {
    this.name = newName;
    return this;
};

/** Changes the secondary name of the NoteCollection object. */
NoteCollection.prototype.setName2 = function (newName) {
    this.name2 = newName;
    return this;
};

/** Resets notes to its original state (notes2). */
NoteCollection.prototype.reset = function () {
    this.notes = this.notes2.slice(0);
    return this;
};

/** Sends the first note to the last index. */  // !!! Can this be more efficient?
NoteCollection.prototype.rotate = function () {
    this.notes.push(this.notes.shift());
    return this;
};

/** Sends the last note to the first index. */  // !!! Can this be more efficient?
NoteCollection.prototype.rotateBack = function () {
    this.notes.unshift(this.notes.pop());
    return this;
};

/** Reverses the order of the notes. */
NoteCollection.prototype.reverse = function () {
    this.notes.reverse();
    return this;
};

/** Removes the note at given index. */
NoteCollection.prototype.removeNoteAt = function (index) {
    if (index < 0) {
        throw new Error("index must be greater than 0");
    }
    this.notes.splice(index, 1);
    return this;
};

/** Removes all the notes with given name. */
NoteCollection.prototype.removeNotesWithName = function (name) {
    this.notes = this.notes.filter(
        function (element) {
            return element.getName() !== name;
        }
    );
    return this;
};

/** Removes all the notes with given secondary name (name2). */
NoteCollection.prototype.removeNotesWithName2 = function (name) {
    this.notes = this.notes.filter(
        function (element) {
            return element.getName2() !== name;
        }
    );
    return this;
};

/** Removes all the notes with given frequency. */
NoteCollection.prototype.removeNotesWithFreq = function (freq) {
    this.notes = this.notes.filter(
        function (element) {
            return element.getFreq() !== freq;
        }
    );
    return this;
};

/** Removes all the notes within a frequency range, inclusive. */
NoteCollection.prototype.removeNotesWithFreqRange = function (fromFreq, toFreq) {
    this.notes = this.notes.filter(
        function (element) {
            var thisFreq = element.getFreq();
            return thisFreq < fromFreq || thisFreq > toFreq;
        }
    );
    return this;
};

// ------------------------
//        Accessors
// ------------------------

/** Returns a string representation of the object. */
NoteCollection.prototype.toString = function () {
    var theName = this.name;
    if (this.name2 !== "") {
        theName += (" " + this.name2);
    }
    return "<" + theName + ">";
};

/** Returns the object state as a string. */
NoteCollection.prototype.toStringDetailed = function () {
    var i,
        j,
        returnString = "name=" + this.name + "\nname2=" + this.name2 + "\nsize=" + this.getSize();

    returnString += "\nnotes=\n";
    for (i in this.notes) {
        if (this.notes.hasOwnProperty(i)) {
            returnString += ("<" + this.notes[i].toStringDetailed() + ">");
        }
    }
    returnString += "\nnotes2=\n";
    for (j in this.notes2) {
        if (this.notes2.hasOwnProperty(j)) {
            returnString += ("<" + this.notes2[j].toStringDetailed() + ">");
        }
    }
    return returnString;
};

/** Retunrs the size of the string NoteCollection. */
NoteCollection.prototype.getSize = function () {
    return this.notes.length;
};

/** Returns the notes. */
NoteCollection.prototype.getNotes = function () {
    return this.notes;
};

/** Returns the original notes. */
NoteCollection.prototype.getOriginalNotes = function () {
    return this.notes2;
};

/** Returns name. */
NoteCollection.prototype.getName = function () {
    return this.name;
};

/** Returns secondary name (name2) */
NoteCollection.prototype.getName2 = function () {
    return this.name2;
};

/** Returns the name of the notes as a string. */
NoteCollection.prototype.getNotesAsString = function () {
    var note,
        returnString = "";
    for (note in this.notes) {
        if (this.notes.hasOwnProperty(note)) {
            returnString += this.notes[note].getName() + " ";
        }
    }
    return returnString;
};

/** Returns the name of the original notes as a string. */
NoteCollection.prototype.getOriginalNotesAsString = function () {
    var note,
        returnString = "";
    for (note in this.notes2) {
        if (this.notes2.hasOwnProperty(note)) {
            returnString += this.notes2[note].getName() + " ";
        }
    }
    return returnString;
};

/** Returns the frequencies of the notes as a string. */
NoteCollection.prototype.getFreqsAsString = function () {
    var note,
        returnString = "";
    for (note in this.notes) {
        if (this.notes.hasOwnProperty(note)) {
            returnString += this.notes[note].getFreq() + " ";
        }
    }
    return returnString;
};

/** Builds an array of the indexes the notes have in a pool. */
NoteCollection.prototype.toIndexes = function (pool) {
    var note,
        thePool = pool || formulas.ET12POOL,
        returnArray = [];
    for (note in this.notes) {
        if (this.notes.hasOwnProperty(note)) {
            returnArray.push(thePool.indexOf(this.notes[note].getName()));
        }
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
    for (i = 0; i < formulaLength; i += 1) {
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
    return new this.constructor(this.notes, this.name, this.name2);
};

/** Creates a deep copy of this. */
NoteCollection.prototype.deepCopy = function () {
    return new this.constructor(processing.createArrayDeepCopy(this.notes),
                              this.name, this.name2);
};

/** Checks equality bewteen this.notes and a Note array. */
NoteCollection.prototype.noteEquals = function (thatNotes) {
    if (!(thatNotes instanceof Array) || !(thatNotes[0] instanceof Note)) {
        return false;
    }
    return processing.objectArrayEquals(thatNotes, this.notes);
};

/** Checks equality, without including this.notes2. */
NoteCollection.prototype.equals = function (that) {
    if (typeof that !== "object" || that.constructor.name !== this.constructor.name) {
        return false;
    }
    return this.name === that.getName() && this.name2 === that.getName2() &&
           this.noteEquals(that.getNotes());
};

/** Checks equality, including this.notes2. */
NoteCollection.prototype.strictEquals = function (that) {
    return this.equals(that) &&
           processing.objectArrayEquals(that.getOriginalNotes(), this.getOriginalNotes());
};

// =========================================================================
//                                Chord
// =========================================================================

/**
* Represents a group of notes as a Chord. 
* Inherits fron NoteCollection.
* @constructor
* @param notes An array of Note objects (optional).
* @param name  Name for the NoteCollection (optional).
* @param name2 Secondary name for the NoteCollection (optional).
*/
var Chord = function Chord(notes, name, name2) {
    NoteCollection.call(this, notes, name, name2);  // inherits from NoteCollection
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
    var i,
        j;
    if (typeof n !== "number") {
        throw new Error("n must be a number");
    }
    if (n > 0) {
        for (i = 0; i < n; i += 1) {
            this.rotate();
        }
    }
    if (n < 0) {
        for (j = 0; j > n; j -= 1) {
            this.rotateBack();
        }
    }
    return this;
};

/** 
* Sets notes to nth inversion, using the original notes (notes2) as reference. 
* Sets to previous inversions if n is negative.
*/
Chord.prototype.invertOriginal = function (n) {
    if (typeof n !== "number") {
        throw new Error("n must be of type number");
    }
    this.reset();
    this.invert(n);
    return this;
};

// =========================================================================
//                                Scale
// =========================================================================

/** 
* Group of Note objects with melodic dynamics (like a succession of notes).
* Inherits fron NoteCollection.
* @constructor
* @param notes An array of Note objects (optional).
* @param name  Primary name. (optional).
* @param name2 Secondary name (optional).
*/
var Scale = function Scale(notes, name, name2) {
    NoteCollection.call(this, notes, name, name2);  // inherits from NoteCollection
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
* Represents a group of chords. 
* @constructor
* @param chords An array of Chord objects (optional).
* @param name   Primary name (optional).
* @param name2  Secondary name (optional).
*/
var ChordCollection = function ChordCollection(chords, name, name2) {
    this.name   = name  || (chords && chords.name)  || "";
    this.name2  = name2 || (chords && chords.name2) || "";
    this.chords = chords instanceof Array ?
                  chords :
                  (chords && chords.chords) || [];
};

// ------------------------
//         Mutators
// ------------------------

ChordCollection.prototype.setChords = function (newChords) {
    if (!(newChords instanceof Array)) {
        throw new Error("chords must be an array of Chord");
    }
    this.chords = newChords;
    return this;
};

// ------------------------
//        Accessors
// ------------------------

ChordCollection.prototype.getName = function () {
    return this.name;
};

ChordCollection.prototype.getName2 = function () {
    return this.name2;
};

ChordCollection.prototype.getSize = function () {
    return this.chords.length;
};

ChordCollection.prototype.getChords = function () {
    return this.chords;
};

ChordCollection.prototype.getChordsNames = function () {
    var i,
        returnString = "";
    for (i in this.chords) {
        if (this.chords.hasOwnProperty(i)) {
            returnString += this.chords[i].name + " ";
        }
    }
    return returnString;
};

ChordCollection.prototype.getChordsNotesAsString = function () {
    var i,
        returnString = "";
    for (i in this.chords) {
        if (this.chords.hasOwnProperty(i)) {
            returnString += "< " + this.chords[i].getNotesAsString() + "> ";
        }
    }
    return returnString;
};

ChordCollection.prototype.toString = function () {
    var theName = this.name;
    if (this.name2 !== "") {
        theName += (" " + this.name2);
    }
    return "<" + theName + ">";
};

ChordCollection.prototype.toStringDetailed = function () {
    var i,
        returnString = "name=" + this.name + "\nname2=" + this.name2 +
                       "\nsize=" + this.getSize();
    returnString += "\n\nchords= ";
    for (i in this.chords) {
        if (this.chords.hasOwnProperty(i)) {
            returnString += "\n<<<\n";
            returnString += this.chords[i].toStringDetailed();
            returnString += "\n>>>";
        }
    }
    return returnString;
};

// ------------------------
//      Other Methods
// ------------------------

/** Creates a swallow copy of this. */
ChordCollection.prototype.copy = function () {
    return new this.constructor(this.chords, this.name, this.name2);
};

/** Creates a deep copy of this. */
ChordCollection.prototype.deepCopy = function () {
    return new this.constructor(processing.createArrayDeepCopy(this.chords),
                               this.name, this.name2);
};

/** Checks for equality between this.chords and an array of chords. */
ChordCollection.prototype.chordEquals = function (thatChords) {
    if (!(thatChords instanceof Array) || !(thatChords[0] instanceof Chord)) {
        return false;
    }
    return processing.objectArrayEquals(thatChords, this.chords);
};

/** Checks for equality for this. */
ChordCollection.prototype.equals = function (that) {
    if (typeof that !== "object" || that.constructor.name !== this.constructor.name) {
        return false;

    }
    return this.name === that.getName() && this.name2 === that.getName2() &&
           this.chordEquals(that.getChords());
};

// =========================================================================
//                                Harmony
// =========================================================================

/**
* Represents a group of chords.
* @constructor
* @param chords An array of Chord objects (optional).
* @param name   Primary name (optional).
* @param name2  Secondary name (optional).
*/
var Harmony = function Harmony(chords, name, name2) {
    ChordCollection.call(this, chords, name, name2);  // Inherits from ChordCollection.
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
