var sounds = require("./sounds");

/** Used as default pool (equal temperament 12 semi-tones). */
var ET12POOL = ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"];

/** Counts the steps between two notes. */
var stepCount = function(note1, note2, pool){
    var thePool = pool || ET12POOL;
    var result  = thePool.indexOf(note2.getName()) - thePool.indexOf(note1.getName());
    if (result < 0) result += thePool.length;
    return result;
};

/** Builds a Scale object, based on a formula. */
var scalize = function(note, formula, pool){
    var thePool      = pool || ET12POOL;
    var noteArray    = [];
    var currentIndex = thePool.indexOf(note.getName());
    var poolSize     = thePool.length;
    for (var i in formula){
        noteArray.push(new sounds.Note(thePool[currentIndex]));
        currentIndex = (currentIndex + formula[i]) % poolSize;
    }
    return new sounds.Scale(noteArray);
};

/** Forms chords derived from the input scale, using superimposed thirds. */
var harmonize = function(scale, depth){
    if (depth < 1 || typeof depth !== "number")
        throw new Error("depth must be a number > 0");
    var chordArray = [];
    var notes      = scale.getNotes();
    var scaleSize  = scale.getSize();
    for(var i = 0; i < scaleSize; i++){                  // For every note in the scale:
        var aNoteArray = [];                             // Build a note array (a chord):
        for(var j = 0, k = 0; j < depth; j++, k += 2)    // With that note plus a number -
            aNoteArray[j] = notes[(k + i) % scaleSize];  // of superimposed thirds (depth).
        chordArray.push(new sounds.Chord(aNoteArray));   // Add that chord to chordList.
    }
    return new sounds.Harmony(chordArray);
};

/** Identifies the name of a chord. */
var identifyChord = function(chord){
    return "!!!"
};

// Node exports:
exports.stepCount = stepCount;
exports.scalize   = scalize;
exports.harmonize = harmonize;
