function Note(name, octave, freq){
    // instance variables
    this.name   = name;
    this.octave = typeof octave === "undefined" ? 0 : octave;  // default argument is 0
    this.freq   = typeof freq   === "undefined" ? 0 : freq;    // default argument is 0
    
    // methods
    this.toString = function(){
        return "name: " + this.name + " octave: " + this.octave + "freq: " + this.freq;
    };
}

// node export
exports.Note = Note;