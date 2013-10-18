function Note(name, freq, octave){
    this.name   = name;
    this.octave = typeof octave === "undefined" ? 0 : octave;  // default argument is 0
    this.freq   = typeof freq   === "undefined" ? 0 : freq;    // default argument is 0
    this.name2  = "";
    
    // ==================================
    //             setters
    // ==================================

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

    // ==================================
    //             getters
    // ==================================

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

    /** Returns the object state as a string. */
    this.toString = function(){
        return "name=" + this.name + " freq=" + this.freq + " octave=" + this.octave;
    };
}

function NoteCollection(notes, name, name2){
    this._notes  = notes;                                      // array of notes
    this._notes2 = notes.slice(0);                             // original notes (clone)
    this.name    = typeof name  === "undefined" ? "" : name;   // default argument is ""
    this.name2   = typeof name2 === "undefined" ? "" : name2;  // default argument is ""
    this.size    = notes.length;
    
    // ==================================
    //             setters
    // ==================================

    /** Change the notes. */ // !!! Should this implement variable arguments?
    this.setNotes = function(notes){
        this._notes = notes;
        this.size   = this._notes.length;
    };
    
    /** Adds one note. */
    this.addNote = function(note){
        this._notes.push(note);
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
        this._notes = this._notes2.slice(0);
        this.size   = this._notes.length;
    };

    /** Sends the first note to the last index. */  // !!! Can this be more efficient?
    this.rotate = function(){
        this._notes.push(this._notes.shift());
    };
    
    /** Reverses the order of the notes. */
    this.reverse = function(){
        this._notes.reverse();
    };

    /** Removes the note at given index. */
    this.removeNoteAt = function(index){
        this._notes.splice(index, 1);
        this.size--;
    };

    /** !!! Removes all the notes with given name. */
    this.removeNotesWithName = function(name){
        this._notes = this._notes.filter(
            function(element){
                return element.name !== name;
            });
        this.size = this._notes.length;
    };

    /** !!! Removes all the notes with given frequency. */
    this.removeNotesWithFreq = function(freq){
        this._notes = this._notes.filter(
            function(element){
                return element.freq !== freq;
            });
        this.size = this._notes.length;
    };

    // ==================================
    //             getters
    // ==================================
    
    /** Returns the object state as a string */
    this.toString = function(){
        var returnString = "size=" + this.size + " name=" + this.name + " name2=" + this.name2;
        returnString += "\nnotes=";
        for (var i in this._notes){
            returnString += " <";
            returnString += this._notes[i].toString();
            returnString += ">";
        }
        returnString += "\nnotes2=";
        for (var j in this._notes2){
            returnString += " <";
            returnString += this._notes2[j].toString();
            returnString += ">";
        }
        return returnString;
    };

    /** Returns the notes. */
    this.getNotes = function(){
        return this._notes;
    };

    /** Returns the original notes. */
    this.getOriginalNotes = function(){
        return this._notes2;
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
        for (var i in this._notes)
            returnString += this._notes[i].name + " ";
        return returnString;
    };

    /** Returns the name of the original notes as a string. */
    this.getOriginalNotesAsString = function(){
        var returnString = "";
        for (var i in this._notes2)
            returnString += this._notes2[i].name + " ";
        return returnString;
    };

    /** Returns the frequencies of the notes as a string. */
    this.getFreqsAsString = function(){
        var returnString = "";
        for (var i in this._notes)
            returnString += this._notes[i].freq + " ";
        return returnString;
    };

}

// node exports
exports.Note = Note;
exports.NoteCollection = NoteCollection;