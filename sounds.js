// ==============================================
//                 Imports
// ==============================================
var formulas = require("./formulas");

// ==============================================
//                     Note
// ==============================================
/**
* Represents a musical note.
*
* @constructor
* @param name   The name of the note.
* @param freq   Frequency of the note (optional).
* @param octave Index/octave of the note (optional).
* @param name2  Secondary name of the note (optional).
* @returns A Note object.
*/
function Note(name, freq, octave, name2){
    this.name   = name   || "";
    this.octave = octave || 0;
    this.freq   = freq   || 0;
    this.name2  = name2  || "";
}
    
// ------------------------
//         Mutators
// ------------------------

/** Sets name. */
Note.prototype.setName = function(newName){
    this.name = newName;
};

/** Sets octave. */
Note.prototype.setOctave = function(newOctave){
    this.octave = newOctave;
};

/** Sets freq. */
Note.prototype.setFreq = function(newFreq){
    this.freq = newFreq;
};

/** Sets the secondary name (name2). */
Note.prototype.setName2 = function(newName2){
    this.name2 = newName2;
};

// ------------------------
//        Accessors
// ------------------------

/** Returns the primitive value of the object, used by the + operator. */
Note.prototype.valueOf = function(){
    return this.freq;
};

/** Returns name. */
Note.prototype.getName = function(){
    return this.name;
};

/** Returns octave. */
Note.prototype.getOctave = function(){
    return this.octave;
};

/** Returns freq. */
Note.prototype.getFreq = function(){
    return this.freq;
};

/** Returns secondary name (name2). */
Note.prototype.getName2 = function(){
    return this.name2;
};

/** Returns the object state as a string. */
Note.prototype.toString = function(){
    return "name=" + this.name + " name2=" + this.name2 + " freq=" + this.freq +
           " octave=" + this.octave;
};

// ==============================================
//                 NoteCollection
// ==============================================
/**
* Represents a group of notes. Parent constructor for Chord and Scale.
* @constructor
* @param notes An array of Note objects.
* @param name  Name for the NoteCollection (optional).
* @param name2 Secondary name for the NoteCollection (optional).
*/
function NoteCollection(notes, name, name2){
    // if (!(notes instanceof Array)) throw new Error("notes must be an array of Note"); needs to handle prototype inheritance
    this.notes  = notes;                           // array of notes
    this.notes2 = notes ? notes.slice(0) : notes;  // original notes (clone)
    this.name   = name  || "";
    this.name2  = name2 || "";
}

// ------------------------
//         Mutators
// ------------------------

/** Change the notes. */
NoteCollection.prototype.setNotes = function(notes){
    if (!(notes instanceof Array)) throw new Error("notes must be an array of Note");
    this.notes = notes;
};

/** Adds one note. */
NoteCollection.prototype.addNote = function(note){
    if (!(note instanceof Note)) throw new Error("note must be a Note object");
    this.notes.push(note);
};

/** Changes the name of the NoteCollection object. */
NoteCollection.prototype.setName = function(newName){
    this.name = newName;
};

/** Changes the secondary name of the NoteCollection object. */
NoteCollection.prototype.setName2 = function(newName){
    this.name2 = newName;
};

/** Resets notes to its original state (notes2). */
NoteCollection.prototype.reset = function(){
    this.notes = this.notes2.slice(0);
};

/** Sends the first note to the last index. */  // !!! Can this be more efficient?
NoteCollection.prototype.rotate = function(){
    this.notes.push(this.notes.shift());
};

/** Sends the last note to the first index. */  // !!! Can this be more efficient?
NoteCollection.prototype.rotateBack = function(){
    this.notes.unshift(this.notes.pop());
};

/** Reverses the order of the notes. */
NoteCollection.prototype.reverse = function(){
    this.notes.reverse();
};

/** Removes the note at given index. */
NoteCollection.prototype.removeNoteAt = function(index){
    if (index < 0) throw new Error("index must be greater than 0");
    this.notes.splice(index, 1);
};

/** Removes all the notes with given name. */
NoteCollection.prototype.removeNotesWithName = function(name){
    this.notes = this.notes.filter(
        function(element){
            return element.getName() !== name;
        });
};

/** Removes all the notes with given secondary name (name2). */
NoteCollection.prototype.removeNotesWithName2 = function(name){
    this.notes = this.notes.filter(
        function(element){
            return element.getName2() !== name;
        });
};

/** Removes all the notes with given frequency. */
NoteCollection.prototype.removeNotesWithFreq = function(freq){
    this.notes = this.notes.filter(
        function(element){
            return element.getFreq() !== freq;
        });
};

/** Removes all the notes within a frequency range, inclusive. */
NoteCollection.prototype.removeNotesWithFreqRange = function(fromFreq, toFreq){
    this.notes = this.notes.filter(
        function(element){
            var theFreq = element.getFreq();
            return theFreq < fromFreq || theFreq > toFreq;
        });
};

// ------------------------
//        Accessors
// ------------------------

/** Returns the object state as a string. */
NoteCollection.prototype.toString = function(){
    var returnString = "name=" + this.name + "\nname2=" + this.name2 + "\nsize=" + this.getSize();
    returnString += "\nnotes=\n";
    for (var i in this.notes){
        returnString += "<";
        returnString += this.notes[i].toString();
        returnString += ">";
    }
    returnString += "\nnotes2=\n";
    for (var j in this.notes2){
        returnString += "<";
        returnString += this.notes2[j].toString();
        returnString += ">";
    }
    return returnString;
};

/** Retunrs the size of the string NoteCollection. */
NoteCollection.prototype.getSize = function(){
    return this.notes.length;
};

/** Returns the notes. */
NoteCollection.prototype.getNotes = function(){
    return this.notes;
};

/** Returns the original notes. */
NoteCollection.prototype.getOriginalNotes = function(){
    return this.notes2;
};

/** Returns name. */
NoteCollection.prototype.getName = function(){
    return this.name;
};

/** Returns secondary name (name2) */
NoteCollection.prototype.getName2 = function(){
    return this.name2;
};

/** Returns the name of the notes as a string. */
NoteCollection.prototype.getNotesAsString = function(){
    var returnString = "";
    for (var i in this.notes)
        returnString += this.notes[i].getName() + " ";
    return returnString;
};

/** Returns the name of the original notes as a string. */
NoteCollection.prototype.getOriginalNotesAsString = function(){
    var returnString = "";
    for (var i in this.notes2)
        returnString += this.notes2[i].getName() + " ";
    return returnString;
};

/** Returns the frequencies of the notes as a string. */
NoteCollection.prototype.getFreqsAsString = function(){
    var returnString = "";
    for (var i in this.notes)
        returnString += this.notes[i].getFreq() + " ";
    return returnString;
};

/** Builds an array of the indexes the notes have in a pool. */
NoteCollection.prototype.toIndexes = function(pool){
    var thePool = pool || formulas.ET12POOL;
    var returnArray = [];
    for (var i in this.notes)
        returnArray.push(thePool.indexOf(this.notes[i].getName()));
    return returnArray;
};

/** Builds a formula based on the indexes the notes have in a pool. */ // !!! this can be more efficient
NoteCollection.prototype.toFormula = function(pool){
    var thePool       = pool || formulas.ET12POOL;
    var indexArray    = this.toIndexes(pool);
    var returnArray   = [];
    var formulaLength = indexArray.length;
    var poolLength    = thePool.length;
    for (var i = 0; i < formulaLength; i++){
        var sum = indexArray[i] - indexArray[(i + 1) % formulaLength];
        if (sum > 0) sum -= poolLength;
        returnArray.push(Math.abs(sum));
    }
    return returnArray;
};

// ==============================================
//                    Chord
// ==============================================
/**
* Represents a group of notes as a Chord. 
* Inherits fron NoteCollection.
* @constructor
* @param notes An array of Note objects.
* @param name  Name for the NoteCollection (optional).
* @param name2 Secondary name for the NoteCollection (optional).
*/
function Chord(notes, name, name2){
    NoteCollection.apply(this, arguments);  // inherits from NoteCollection
}

// ------------------------
//       Inheritance
// ------------------------

Chord.prototype = Object.create(NoteCollection.prototype);
Chord.prototype.constructor = Chord;

// ------------------------
//         Mutators
// ------------------------

/** Sets notes to nth inversion. Sets to previous inversions if n is negative. */ // !!! can this be done more efficiently?
Chord.prototype.invert = function(n){
    if (typeof(n) !== "number") throw new Error("n must be of type number");
    if (n > 0)
        for (var i = 0; i < n; i++)
            this.rotate();
    if (n < 0)
        for (var j = 0; j > n; j--)
            this.rotateBack();
};

/** 
* Sets notes to nth inversion, using the original notes (notes2) as reference. 
* Sets to previous inversions if n is negative.
*/
Chord.prototype.invertOriginal = function(n){
    if (typeof(n) !== "number") throw new Error("n must be of type number");
    this.reset();
    this.invert(n);
};

/** 
* Group of Note objects with melodic dynamics (like a succession of notes).
*
* @constructor
*/
function Scale(notes, name, name2){
    NoteCollection.apply(this, arguments);  // inherits from NoteCollection
}
Scale.prototype = Object.create(NoteCollection.prototype);
Scale.prototype.constructor = Scale;

/** 
* Represents a group of chords 
* @constructor
*/
function ChordCollection(chords, name, name2){
    // if (!(chords instanceof Array)) throw new Error("chords must be an array of Chord"); !!! this needs to work with prototype inheritance!!!!
    this.name   = name  || "";
    this.name2  = name2 || "";
    this.chords = chords;
    this.size   = chords ? chords.length : 0;

    // ==============================================
    //                   Mutators
    // ==============================================

    this.setChords = function(newChords){
        if (!(chords instanceof Array)) throw new Error("chords must be an array of Chord");
        this.chords = newChords;
        this.size   = chords.length;
    };

    // ==============================================
    //                  Accessors
    // ==============================================

    this.getChords = function(){
        return this.chords;
    };

    this.getChordsNames = function(){
        var returnString = "";
        for (var i in this.chords)
            returnString += this.chords[i].name + " ";
        return returnString;
    };

    this.getChordsNotesAsString = function(){
        var returnString = "";
        for (var i in this.chords)
            returnString += "< " + this.chords[i].getNotesAsString() + "> ";
        return returnString;
    };

    this.toString = function(){
        var returnString = "name=" + this.name + "\nname2=" + this.name2 + "\nsize=" + this.size;
        returnString += "\n\nchords= ";
        for (var i in this.chords){
            returnString += "\n<<<\n";
            returnString += this.chords[i].toString();
            returnString += "\n>>>";
        }
        return returnString;
    };
}

/**
* Represents a group of chords.
* @constructor
*/
function Harmony(chords, name, name2){
    ChordCollection.apply(this, arguments);
}
Harmony.prototype = Object.create(ChordCollection.prototype);
Harmony.prototype.constructor = Harmony;



// node exports
exports.Note            = Note;
exports.NoteCollection  = NoteCollection;
exports.Chord           = Chord;
exports.Scale           = Scale;
exports.ChordCollection = ChordCollection;
exports.Harmony         = Harmony;
