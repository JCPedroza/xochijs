// ===== imports =====

var sounds = require("./sounds");

// ===== declarations =====

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

var A2  = new sounds.Note("A",  440.000, 4);
var A3  = new sounds.Note("A",  440.000, 4);

var ABC = new sounds.NoteCollection([A, B, C], "ABC");
var BCD = new sounds.NoteCollection([B, C, D], "BCD"); // use only at NoteCollection mutation

// ===== assertions =====

// Note getters
console.assert(A.name === "A", "1");
console.assert(A.freq === 440.000, "2");
console.assert(A.octave === 4, "3");
console.assert(A.toString() === "name=A freq=440 octave=4 name2=La", "4");

// NoteCollection getters
console.assert(ABC.size === 3, "5");
console.assert(ABC.name === "ABC", "6");
console.assert(ABC.name2 === "", "7");
console.assert(JSON.stringify(ABC.getNotes()) === JSON.stringify([A, B, C]), "8");

// NoteCollection mutation
BCD.addNote(E);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D, E]), "9");
console.assert(BCD.size === 4, "10");
BCD.reset();
console.assert(BCD.size === 3, "11");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]), "12");
BCD.setNotes([D, E]);
console.assert(BCD.size === 2, "13");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, E]), "14");
BCD.reset();
console.assert(BCD.size === 3, "15");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]), "16");
BCD.reverse();
console.assert(BCD.size === 3, "17");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, C, B]), "18");
BCD.rotate();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, B, D]), "19");
BCD.removeNoteAt(1);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D]), "20");
console.assert(BCD.size === 2, "21");
console.assert(BCD.getNotesAsString() === "C D ", "22");
console.assert(BCD.getOriginalNotesAsString() === "B C D ", "23");
console.assert(BCD.getFreqsAsString() === "523.251 587.33 ", "24");
BCD.setName("C D");
BCD.setName2("secondary name");
console.assert(BCD.getName() === "C D", "25");
console.assert(BCD.getName2() === "secondary name", "26");
BCD.setNotes([C, A, B, A2, A3, G, C, A2]);
console.assert(BCD.getNotesAsString() === "C A B A A G C A ", "27");
console.assert(BCD.size === 8, "28");
BCD.removeNotesWithName("A");
console.assert(BCD.getNotesAsString() === "C B G C ", "29");
console.assert(BCD.size === 4, "30");
BCD.setNotes([C, A, B, A2, A3, G, C, A2]);
BCD.removeNotesWithFreq(440);
console.assert(BCD.getNotesAsString() === "C B G C ", "31");
console.assert(BCD.size === 4, "32");
BCD.removeNotesWithName2("Do");
console.assert(BCD.getNotesAsString() === "B G ", "33");
console.assert(BCD.size === 2, "34");
BCD.reset();
console.assert(BCD.size === 3, "35");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]), "36");
BCD.rotateBack();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, B, C]), "37");
BCD.rotateBack();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D, B]), "38");
BCD.rotateBack();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]), "39");
BCD.rotate();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D, B]), "40");
BCD.rotate();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, B, C]), "41");
BCD.rotate();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]), "42");
BCD.setNotes([A, B, C, D, E, F, G]);
console.assert(BCD.getSize() === 7, "43");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([A, B, C, D, E, F, G]), "44");
BCD.removeNotesWithFreqRange(490, 700);
console.assert(BCD.getSize() === 2, "45");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([A, G]), "46");


