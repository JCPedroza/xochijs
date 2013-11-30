// ===== imports =====

var sounds      = require("../sounds");
var processing  = require("../processing");
var formulas    = require("../formulas");
var harmony     = require("../harmony");
var identify    = require("../identify");

var A  = new sounds.Note("A",  440.000, 4, "La");
var Bb = new sounds.Note("Bb", 466.164, 4);
var B  = new sounds.Note("B",  493.883, 4, "Si");
var C  = new sounds.Note("C",  523.251, 5, "Do");
var Db = new sounds.Note("Db", 554.365, 5);
var D  = new sounds.Note("D",  587.330, 5, "Re");
var Eb = new sounds.Note("Eb", 622.254, 5);
var E  = new sounds.Note("E",  659.255, 5);
var F  = new sounds.Note("F",  698.456, 5);
var Gb = new sounds.Note("Gb", 739.989, 5);
var G  = new sounds.Note("G",  783.991, 5, "Sol");
var Ab = new sounds.Note("Ab", 830.609, 5);
var CEG = new sounds.Chord([C, E, G]);
var CDbD = new sounds.Chord([C, Db, D]);
var CM  = new sounds.Scale([C, D, E, F, G, A, B], "C ionian");
var BCD  = new sounds.NoteCollection([B, C, D], "BCD");

var shorty = function (formula, start) {
    console.log(processing.fromFormulaToNotes(formula, start));
};
var shortyb = function (notes) {
    console.log(processing.toFormula(notes));
};

// D13 = D, F#, A, C, Eb, G, B = D, C, Eb, B
shorty([2, 1, 8]);
shorty([2, 1, 8], "D");
shortyb(["C", "Eb", "B", "D"]);
shortyb(["D", "C", "Eb", "B"]);
// [ 'C', 'D', 'Eb', 'B' ] -> Cminmaj9 no5    -> C Eb B D ||||  [[3, 8, 3] 0]
// "D", "C", "Eb", "B"]    -> = D13b9 no 3, 5 -> D C EB B ||||












