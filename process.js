var sounds = require("./sounds");

/** Used as default pool (equal temperament 12 semi-tones). */
var ET12POOL = ["Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G"];

/** Counts the steps between two notes. */
var stepCount = function(note1, note2, pool){
    var thePool = typeof pool === "undefined" ? ET12POOL : pool;  // default argument is ET12POOL
    var result  = thePool.indexOf(note2.getName()) - thePool.indexOf(note1.getName());
    if (result < 0) result += thePool.length;
    return result;
};

/** Builds a Scale object, based on a formula. */
var scalize = function(note, formula, pool){
    var thePool      = typeof pool === "undefined" ? ET12POOL : pool;  // default argument is ET12POOL
    var noteArray    = [];
    var currentIndex = thePool.indexOf(note.getName());
    var poolSize     = thePool.length;
    for (var i in formula){
        noteArray.push(new sounds.Note(thePool[currentIndex]));
        currentIndex = (currentIndex + formula[i]) % poolSize;
    }
    return new sounds.Scale(noteArray);
};

// Node exports:
exports.stepCount = stepCount;
exports.scalize   = scalize;
