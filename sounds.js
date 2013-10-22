/** Used as default pool (equal temperament 12 semi-tones). */
var ET12POOL = ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"];

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
    this.name   = name;
    this.octave = octave || 0;
    this.freq   = freq   || 0;
    this.name2  = name2  || "";
    
    // ==============================================
    //                   Mutators
    // ==============================================

    /** Sets name. */
    this.setName = function(newName){
        this.name = newName;
    };

    /** Sets octave. */
    this.setOctave = function(newOctave){
        this.octave = newOctave;
    };

    /** Sets freq. */
    this.setFreq = function(newFreq){
        this.freq = newFreq;
    };

    /** Sets the secondary name (name2). */
    this.setName2 = function(newName2){
        this.name2 = newName2;
    };

    // ==============================================
    //                  Accessors
    // ==============================================

    /** Returns name. */
    this.getName = function(){
        return this.name;
    };

    /** Returns octave. */
    this.getOctave = function(){
        return this.octave;
    };

    /** Returns freq. */
    this.getFreq = function(){
        return this.freq;
    };

    /** Returns secondary name (name2). */
    this.getName2 = function(){
        return this.name2;
    };

    /** Returns the object state as a string. */
    this.toString = function(){
        return "name=" + this.name + " name2=" + this.name2 + " freq=" + this.freq + " octave=" + this.octave;
    };
}

/**
* Represents a group of notes. Parent constructor for Chord and Scale.
* @constructor
* @param notes An array of Note objects.
* @param name  Name for the NoteCollection (optional).
* @param name2 Secondary name for the NoteCollection (optional).
*/
function NoteCollection(notes, name, name2){
    if (!(notes instanceof Array)) throw new Error("notes must be an array of Note");
    this.notes  = notes;           // array of notes
    this.notes2 = notes.slice(0);  // original notes (clone)
    this.name   = name  || "";
    this.name2  = name2 || "";
    this.size   = notes.length;
    
    // ==============================================
    //                   Mutators
    // ==============================================

    /** Change the notes. */ // !!! Should this implement variable arguments?
    this.setNotes = function(notes){
        if (!(notes instanceof Array)) throw new Error("notes must be an array of Note");
        this.notes = notes;
        this.size  = this.notes.length;
    };
    
    /** Adds one note. */
    this.addNote = function(note){
        if (!(note instanceof Note)) throw new Error("note must be a Note object");
        this.notes.push(note);
        this.size++;
    };
    
    /** Changes the name of the NoteCollection object. */
    this.setName = function(newName){
        this.name = newName;
    };

    /** Changes the secondary name of the NoteCollection object. */
    this.setName2 = function(newName){
        this.name2 = newName;
    };

    /** Resets notes to its original state (notes2). */
    this.reset = function(){
        this.notes = this.notes2.slice(0);
        this.size  = this.notes.length;
    };

    /** Sends the first note to the last index. */  // !!! Can this be more efficient?
    this.rotate = function(){
        this.notes.push(this.notes.shift());
    };

    /** Sends the last note to the first index. */  // !!! Can this be more efficient?
    this.rotateBack = function(){
        this.notes.unshift(this.notes.pop());
    };


    /** Reverses the order of the notes. */
    this.reverse = function(){
        this.notes.reverse();
    };

    /** Removes the note at given index. */
    this.removeNoteAt = function(index){
        if (index < 0) throw new Error("index must be > 0");
        this.notes.splice(index, 1);
        this.size--;
    };

    /** Removes all the notes with given name. */
    this.removeNotesWithName = function(name){
        this.notes = this.notes.filter(
            function(element){
                return element.name !== name;
            });
        this.size = this.notes.length;
    };

    /** Removes all the notes with given secondary name (name2). */
    this.removeNotesWithName2 = function(name){
        this.notes = this.notes.filter(
            function(element){
                return element.name2 !== name;
            });
        this.size = this.notes.length;
    };

    /** Removes all the notes with given frequency. */
    this.removeNotesWithFreq = function(freq){
        this.notes = this.notes.filter(
            function(element){
                return element.freq !== freq;
            });
        this.size = this.notes.length;
    };

    /** Removes all the notes within a frequency range, inclusive. */
    this.removeNotesWithFreqRange = function(fromFreq, toFreq){
        this.notes = this.notes.filter(
            function(element){
                return element.freq < fromFreq || element.freq > toFreq;
            });
        this.size = this.notes.length;
    };

    // ==============================================
    //                  Accessors
    // ==============================================
    
    /** Returns the object state as a string */
    this.toString = function(){
        var returnString = "name=" + this.name + "\nname2=" + this.name2 + "\nsize=" + this.size;
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
    this.getSize = function(){
        return this.size;
    };

    /** Returns the notes. */
    this.getNotes = function(){
        return this.notes;
    };

    /** Returns the original notes. */
    this.getOriginalNotes = function(){
        return this.notes2;
    };

    /** Returns name. */
    this.getName = function(){
        return this.name;
    };

    /** Returns secondary name (name2) */
    this.getName2 = function(){
        return this.name2;
    };

    /** Returns the name of the notes as a string. */
    this.getNotesAsString = function(){
        var returnString = "";
        for (var i in this.notes)
            returnString += this.notes[i].name + " ";
        return returnString;
    };

    /** Returns the name of the original notes as a string. */
    this.getOriginalNotesAsString = function(){
        var returnString = "";
        for (var i in this.notes2)
            returnString += this.notes2[i].name + " ";
        return returnString;
    };

    /** Returns the frequencies of the notes as a string. */
    this.getFreqsAsString = function(){
        var returnString = "";
        for (var i in this.notes)
            returnString += this.notes[i].freq + " ";
        return returnString;
    };

    /** Builds an array of the indexes the notes have in a pool. */
    this.toIndexes = function(pool){
        var thePool = pool || ET12POOL;
        var returnArray = [];
        for (var i in this.notes)
            returnArray.push(thePool.indexOf(this.notes[i].name));
        return returnArray;
    };

    /** Builds a formula based on the indexes the notes have in a pool. */ // !!! this can be more efficient
    this.toFormula = function(pool){
        var thePool       = pool || ET12POOL;
        var indexArray    = this.toIndexes();
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

}

/**
* Represents a group of notes as a Chord. 
* Inherits fron NoteCollection.
* @constructor
* @param notes An array of Note objects.
* @param name  Name for the NoteCollection (optional).
* @param name2 Secondary name for the NoteCollection (optional).
*/
function Chord(notes, name, name2){
    NoteCollection.call(this, notes, name, name2);  // inherits from NoteCollection

    // ==============================================
    //                   Mutators
    // ==============================================

    /** Sets notes to nth inversion. Sets to previous inversions if n is negative. */ // !!! can this be done more efficiently?
    this.invert = function(n){
        if (typeof(n) !== "number") throw new Error("n must be of type number");
        if (n > 0)
            for (var i = 0; i < n; i++)
                this.notes.push(this.notes.shift());
        if (n < 0)
            for (var j = 0; j > n; j--)
                this.notes.unshift(this.notes.pop());
    };

    /** 
    * Sets notes to nth inversion, using the original notes (notes2) as reference. 
    * Sets to previous inversions if n is negative.
    */
    this.invertOriginal = function(n){
        if (typeof(n) !== "number") throw new Error("n must be of type number");
        this.reset();
        this.invert(n);
    };
}

/** 
* Group of Note objects with melodic dynamics (like a succession of notes).
*
* @constructor
*/
function Scale(notes, name, name2){
    NoteCollection.call(this, notes, name, name2);  // inherits from NoteCollection
}

/** 
* Represents a group of chords 
* @constructor
*/
function ChordCollection(chords, name, name2){
    if (!(chords instanceof Array)) throw new Error("chords must be an array of Chord");
    this.name   = name  || "";
    this.name2  = name2 || "";
    this.chords = chords;
    this.size   = chords.length;

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

    this.getChordsAsString = function(){
        var returnString = "";
        for (var i in this.chords)
            returnString += this.chords[i].name + " ";
        return returnString;
    };

    this.getChordsNotesAsString = function(){
        var returnString = "";
        for (var i in this.chords)
            returnString += this.chords[i].getNotesAsString() + " ";
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
    ChordCollection.call(this, chords, name, name2);
}



// node exports
exports.Note            = Note;
exports.NoteCollection  = NoteCollection;
exports.Chord           = Chord;
exports.Scale           = Scale;
exports.ChordCollection = ChordCollection;
exports.Harmony         = Harmony;
