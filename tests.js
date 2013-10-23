// ===== imports =====

var sounds   = require("./sounds");
var process  = require("./process");
var formulas = require("./formulas");
var harmony  = require("./harmony");
var identify = require("./identify");

// ===== declarations =====

var equals = process.arraysEqual;  // checks equality for arrays

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

var ABC  = new sounds.NoteCollection([A, B, C], "ABC");
var GAbC = new sounds.NoteCollection([G, Ab, C], "GAbC");
var BCD  = new sounds.NoteCollection([B, C, D], "BCD"); // use only at NoteCollection mutation

var CEG  = new sounds.Chord([C, E, G], "C major");
var EGC  = new sounds.Chord([E, G, C], "C major inv");
var CGE  = new sounds.Chord([C, G, E], "C major");
var ACE  = new sounds.Chord([A, C, E], "A minor");
var FAC  = new sounds.Chord([F, A, C], "F major");
var DFA  = new sounds.Chord([D, F, A], "D minor");
var CFG  = new sounds.Chord([C, F, G], "C sus4");
var CDG  = new sounds.Chord([C, D, G], "C sus2");
var ACEb = new sounds.Chord([A, C, Eb], "A dim");
var CEAb = new sounds.Chord([C, E, Ab], "C aug");
var CEGB = new sounds.Chord([C, E, G, B], "C major 7");
var ACEG = new sounds.Chord([A, C, E, G], "A minor 7");
var FACE = new sounds.Chord([F, A, C, E], "F major 7");
var DFAC = new sounds.Chord([D, F, A, C], "D minor 7");

var CM  = new sounds.Scale([C, D, E, F, G, A, B], "C ionian");

var chc1 = new sounds.ChordCollection([CEG, ACE, FAC], "chc1");
var h1   = new sounds.Harmony([CEG, ACE, FAC], "h1");

// ===== assertions =====

// Note getters
console.assert(A.name   === "A");
console.assert(A.freq   === 440.000);
console.assert(A.octave === 4);
console.assert(A.toString() === "name=A name2=La freq=440 octave=4");

// NoteCollection getters
console.assert(ABC.size  === 3);
console.assert(ABC.name  === "ABC");
console.assert(ABC.name2 === "");
console.assert(JSON.stringify(ABC.getNotes())   === JSON.stringify([A, B, C]));
console.assert(JSON.stringify(ABC.toIndexes())  === JSON.stringify([1, 3, 4]));
console.assert(JSON.stringify(GAbC.toIndexes()) === JSON.stringify([11, 0, 4]));
console.assert(ABC.toFormula().toString() === [2, 1, 9].toString());

// NoteCollection mutation
BCD.addNote(E);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D, E]));
console.assert(BCD.size === 4);
BCD.reset();
console.assert(BCD.size === 3);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.setNotes([D, E]);
console.assert(BCD.size === 2);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, E]));
BCD.reset();
console.assert(BCD.size === 3);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.reverse();
console.assert(BCD.size === 3);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, C, B]));
BCD.rotate();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, B, D]));
BCD.removeNoteAt(1);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D]));
console.assert(BCD.size === 2);
console.assert(BCD.getNotesAsString() === "C D ");
console.assert(BCD.getOriginalNotesAsString() === "B C D ");
console.assert(BCD.getFreqsAsString() === "523.251 587.33 ");
BCD.setName("C D");
BCD.setName2("secondary name");
console.assert(BCD.getName() === "C D");
console.assert(BCD.getName2() === "secondary name");
BCD.setNotes([C, A, B, A2, A3, G, C, A2]);
console.assert(BCD.getNotesAsString() === "C A B A A G C A ");
console.assert(BCD.size === 8);
BCD.removeNotesWithName("A");
console.assert(BCD.getNotesAsString() === "C B G C ");
console.assert(BCD.size === 4);
BCD.setNotes([C, A, B, A2, A3, G, C, A2]);
BCD.removeNotesWithFreq(440);
console.assert(BCD.getNotesAsString() === "C B G C ");
console.assert(BCD.size === 4);
BCD.removeNotesWithName2("Do");
console.assert(BCD.getNotesAsString() === "B G ");
console.assert(BCD.size === 2);
BCD.reset();
console.assert(BCD.size === 3);
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.rotateBack();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, B, C]));
BCD.rotateBack();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D, B]));
BCD.rotateBack();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.rotate();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D, B]));
BCD.rotate();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, B, C]));
BCD.rotate();
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.setNotes([A, B, C, D, E, F, G]);
console.assert(BCD.getSize() === 7, "43");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([A, B, C, D, E, F, G]));
BCD.removeNotesWithFreqRange(490, 700);
console.assert(BCD.getSize() === 2, "45");
console.assert(JSON.stringify(BCD.getNotes()) === JSON.stringify([A, G]));

// Chord access and mutation
console.assert(JSON.stringify(CEG.toIndexes()) === JSON.stringify([4, 8, 11]));
console.assert(CEG.getNotesAsString() === "C E G ");
CEG.invert(1);
console.assert(CEG.getNotesAsString() === "E G C ");
CEG.invert(1);
console.assert(CEG.getNotesAsString() === "G C E ");
CEG.invert(1);
console.assert(CEG.getNotesAsString() === "C E G ");
CEG.invert(-1);
console.assert(CEG.getNotesAsString() === "G C E ");
CEG.invert(-1);
console.assert(CEG.getNotesAsString() === "E G C ");
CEG.invert(-1);
console.assert(CEG.getNotesAsString() === "C E G ");
CEG.invert(2);
console.assert(CEG.getNotesAsString() === "G C E ");
CEG.invert(-1);
console.assert(CEG.getNotesAsString() === "E G C ");
CEG.invert(-2);
console.assert(CEG.getNotesAsString() === "G C E ");
CEG.reset();
console.assert(CEG.getNotesAsString() === "C E G ");


// Scale access and mutation
console.assert(CM.toFormula().toString() === [2,2,1,2,2,2,1].toString());

// ChordCollection access and mutation
console.assert(chc1.getChordsNames() === "C major A minor F major ");

// Harmony access and mutation
console.assert(h1.getChordsNames() === "C major A minor F major ");

// NoteCollection.toFormula()
console.assert(CEG.toFormula().toString()  === [4 ,3, 5].toString());
console.assert(FAC.toFormula().toString()  === [4, 3, 5].toString());
console.assert(ACE.toFormula().toString()  === [3, 4, 5].toString());
console.assert(DFA.toFormula().toString()  === [3, 4, 5].toString());
console.assert(CEGB.toFormula().toString() === [4, 3, 4, 1].toString());
console.assert(FACE.toFormula().toString() === [4, 3, 4, 1].toString());
console.assert(ACEG.toFormula().toString() === [3, 4, 3, 2].toString());
console.assert(DFAC.toFormula().toString() === [3, 4, 3, 2].toString());
console.assert(CFG.toFormula().toString()  === [5, 2, 5].toString());
console.assert(CDG.toFormula().toString()  === [2, 5, 5].toString());


// Process stepCount
console.assert(process.stepCount(A, Bb) === 1);
console.assert(process.stepCount(A, B)  === 2);
console.assert(process.stepCount(G, Ab) === 1);
console.assert(process.stepCount(D, Db) === 11);

// Process scalize
console.assert(process.scalize(C, formulas.MAJOR).getNotesAsString() === "C D E F G A B ");
console.assert(process.scalize(C, formulas.MINOR).getNotesAsString() === "C D Eb F G Ab Bb ");

// harmony.harmonize
console.assert(harmony.harmonize(CM, 3).getChordsNotesAsString() ===
    "< C E G > < D F A > < E G B > < F A C > < G B D > < A C E > < B D F > ");



// Process buildInversions
var CEGinvs  = process.buildInversions(CEG);
var CEGinvs2 = [];
for (var i = 0; i < CEGinvs.length; i++)
    CEGinvs2[i] = CEGinvs[i].getNotesAsString();
console.assert(equals(CEGinvs2, ['C E G ', 'E G C ', 'G C E ']));


// identify.identifyChord
console.assert(equals(identify.identifyChord(CEG),  ['C maj' ]));
console.assert(equals(identify.identifyChord(EGC),  ['C maj' ]));
console.assert(equals(identify.identifyChord(CEAb), ['C aug', 'E aug', 'Ab aug']));
console.assert(equals(identify.identifyChord(CDG),  ['C sus2', 'G sus4']));
console.assert(equals(identify.identifyChord(CFG),  ['C sus4', 'F sus2']));
console.assert(equals(identify.identifyChord(ACE),  ['A min' ]));
console.assert(equals(identify.identifyChord(ACEb), ['A dim' ] ));

// Process arraysEqual
console.assert(equals([1, 2], [1, 2])    === true);
console.assert(equals([1, 3, 4], [1, 2]) === false);

// process.buildPermutations()
var buildPermutations1    = process.buildPermutations(CEG);
var buildPermutations1Str = "";
for (var i = 0; i < buildPermutations1.length; i++)
    buildPermutations1Str += buildPermutations1[i].getNotesAsString() + " ";
console.assert(buildPermutations1Str === "C E G  C G E  E C G  E G C  G C E  G E C  ");







