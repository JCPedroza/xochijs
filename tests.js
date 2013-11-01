// ===== imports =====

var sounds   = require("./sounds");
var process  = require("./process");
var formulas = require("./formulas");
var harmony  = require("./harmony");
var identify = require("./identify");

// ==== compare and assert functions ===

var numberOfErrors = 0;            // to keep track of the number of errors
var equals = process.arraysEqual;  // checks equality for arrays

/** Assert equals for two arrays. */
var aea = function(a, b){
    try{
        console.assert(equals(a, b));
    }
    catch(Error){
        numberOfErrors++;
        console.log();
        console.log(Error.name);               // name of the error
        console.log(a);                        // value a
        console.log(b);                        // value b
        console.log(Error.stack.split("\n"));  // line number of the caller
        console.log();
    }
};

/** console.assert alias */
var ae = function(a){
    try{
        console.assert(a);
    }
    catch(Error){
        numberOfErrors++;
        console.log();
        console.log(Error.name);               // name of the error
        console.log(a);                        // value a
        console.log(Error.stack.split("\n"));  // line number of the caller
        console.log();
    }
    
};

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

var ABC  = new sounds.NoteCollection([A, B, C], "ABC");
var GAbC = new sounds.NoteCollection([G, Ab, C], "GAbC");
var BCD  = new sounds.NoteCollection([B, C, D], "BCD"); // use only at NoteCollection mutation

var CEG  = new sounds.Chord([C, E, G], "C major");
var CGE  = new sounds.Chord([C, G, E], "C major");
var EGC  = new sounds.Chord([E, G, C], "C major");
var ECG  = new sounds.Chord([E, C, G], "C major");
var GCE  = new sounds.Chord([G, C, E], "C major");
var GEC  = new sounds.Chord([G, E, C], "C major");

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
ae(A.name   === "A");
ae(A.freq   === 440.000);
ae(A.octave === 4);
ae(A.toString() === "name=A name2=La freq=440 octave=4");

// NoteCollection getters
ae(ABC.size  === 3);
ae(ABC.name  === "ABC");
ae(ABC.name2 === "");
ae(JSON.stringify(ABC.getNotes())   === JSON.stringify([A, B, C]));
ae(JSON.stringify(ABC.toIndexes())  === JSON.stringify([1, 3, 4]));
ae(JSON.stringify(GAbC.toIndexes()) === JSON.stringify([11, 0, 4]));
ae(ABC.toFormula().toString() === [2, 1, 9].toString());

// NoteCollection mutation
BCD.addNote(E);
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D, E]));
ae(BCD.size === 4);
BCD.reset();
ae(BCD.size === 3);
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.setNotes([D, E]);
ae(BCD.size === 2);
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, E]));
BCD.reset();
ae(BCD.size === 3);
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.reverse();
ae(BCD.size === 3);
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, C, B]));
BCD.rotate();
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, B, D]));
BCD.removeNoteAt(1);
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D]));
ae(BCD.size === 2);
ae(BCD.getNotesAsString() === "C D ");
ae(BCD.getOriginalNotesAsString() === "B C D ");
ae(BCD.getFreqsAsString() === "523.251 587.33 ");
BCD.setName("C D");
BCD.setName2("secondary name");
ae(BCD.getName() === "C D");
ae(BCD.getName2() === "secondary name");
BCD.setNotes([C, A, B, A2, A3, G, C, A2]);
ae(BCD.getNotesAsString() === "C A B A A G C A ");
ae(BCD.size === 8);
BCD.removeNotesWithName("A");
ae(BCD.getNotesAsString() === "C B G C ");
ae(BCD.size === 4);
BCD.setNotes([C, A, B, A2, A3, G, C, A2]);
BCD.removeNotesWithFreq(440);
ae(BCD.getNotesAsString() === "C B G C ");
ae(BCD.size === 4);
BCD.removeNotesWithName2("Do");
ae(BCD.getNotesAsString() === "B G ");
ae(BCD.size === 2);
BCD.reset();
ae(BCD.size === 3);
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.rotateBack();
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, B, C]));
BCD.rotateBack();
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D, B]));
BCD.rotateBack();
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.rotate();
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([C, D, B]));
BCD.rotate();
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([D, B, C]));
BCD.rotate();
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([B, C, D]));
BCD.setNotes([A, B, C, D, E, F, G]);
ae(BCD.getSize() === 7, "43");
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([A, B, C, D, E, F, G]));
BCD.removeNotesWithFreqRange(490, 700);
ae(BCD.getSize() === 2, "45");
ae(JSON.stringify(BCD.getNotes()) === JSON.stringify([A, G]));

// Chord access and mutation
ae(JSON.stringify(CEG.toIndexes()) === JSON.stringify([4, 8, 11]));
ae(CEG.getNotesAsString() === "C E G ");
CEG.invert(1);
ae(CEG.getNotesAsString() === "E G C ");
CEG.invert(1);
ae(CEG.getNotesAsString() === "G C E ");
CEG.invert(1);
ae(CEG.getNotesAsString() === "C E G ");
CEG.invert(-1);
ae(CEG.getNotesAsString() === "G C E ");
CEG.invert(-1);
ae(CEG.getNotesAsString() === "E G C ");
CEG.invert(-1);
ae(CEG.getNotesAsString() === "C E G ");
CEG.invert(2);
ae(CEG.getNotesAsString() === "G C E ");
CEG.invert(-1);
ae(CEG.getNotesAsString() === "E G C ");
CEG.invert(-2);
ae(CEG.getNotesAsString() === "G C E ");
CEG.reset();
ae(CEG.getNotesAsString() === "C E G ");


// Scale access and mutation
ae(CM.toFormula().toString() === [2,2,1,2,2,2,1].toString());

// ChordCollection access and mutation
ae(chc1.getChordsNames() === "C major A minor F major ");

// Harmony access and mutation
ae(h1.getChordsNames() === "C major A minor F major ");

// NoteCollection.toFormula()
ae(CEG.toFormula().toString()  === [4 ,3, 5].toString());
ae(FAC.toFormula().toString()  === [4, 3, 5].toString());
ae(ACE.toFormula().toString()  === [3, 4, 5].toString());
ae(DFA.toFormula().toString()  === [3, 4, 5].toString());
ae(CEGB.toFormula().toString() === [4, 3, 4, 1].toString());
ae(FACE.toFormula().toString() === [4, 3, 4, 1].toString());
ae(ACEG.toFormula().toString() === [3, 4, 3, 2].toString());
ae(DFAC.toFormula().toString() === [3, 4, 3, 2].toString());
ae(CFG.toFormula().toString()  === [5, 2, 5].toString());
ae(CDG.toFormula().toString()  === [2, 5, 5].toString());


// Process stepCount
ae(process.stepCount(A, Bb) === 1);
ae(process.stepCount(A, B)  === 2);
ae(process.stepCount(G, Ab) === 1);
ae(process.stepCount(D, Db) === 11);

// Process scalize
ae(process.scalize(C, formulas.MAJOR).getNotesAsString() === "C D E F G A B ");
ae(process.scalize(C, formulas.MINOR).getNotesAsString() === "C D Eb F G Ab Bb ");

// Process buildInversions
var CEGinvs  = process.buildInversions(CEG);
var CEGinvs2 = [];
for (var i = 0; i < CEGinvs.length; i++)
    CEGinvs2[i] = CEGinvs[i].getNotesAsString();
ae(equals(CEGinvs2, ['C E G ', 'E G C ', 'G C E ']));

// Process arraysEqual
ae(equals([1, 2], [1, 2])    === true);
ae(equals([1, 3, 4], [1, 2]) === false);

// process.buildPermutations()
var buildPermutations1    = process.buildPermutations(CEG);
var buildPermutations1Str = "";
for (var i = 0; i < buildPermutations1.length; i++)
    buildPermutations1Str += buildPermutations1[i].getNotesAsString() + " ";
ae(buildPermutations1Str === "C E G  C G E  E C G  E G C  G C E  G E C  ");

// =========================================================================
//                         process.toFormula() 
// =========================================================================

aea(process.toFormula(["C", "E",  "B"]),        [4, 7, 1 ]);
aea(process.toFormula(["C", "Eb", "Bb"]),       [3, 7, 2 ]);
aea(process.toFormula(["C", "E",  "Bb"]),       [4, 6, 2 ]);
aea(process.toFormula(["C", "Eb", "A"]),        [3, 6, 3 ]);
aea(process.toFormula(["C", "Eb", "B"]),        [3, 8, 1 ]);
aea(process.toFormula(["C", "E",  "A"]),        [4, 5, 3 ]);
aea(process.toFormula(["C", "Eb", "A"]),        [3, 6, 3 ]);
aea(process.toFormula(["C", "E",  "D"]),        [4, 10, 10 ]);
aea(process.toFormula(["C", "E",  "F"]),        [4, 1, 7 ]);

aea(process.toFormula(["C", "E",  "G",  "B"]),  [4, 3, 4, 1]);
aea(process.toFormula(["C", "Eb", "G",  "Bb"]), [3, 4, 3, 2]);
aea(process.toFormula(["C", "E",  "G",  "Bb"]), [4, 3, 3, 2]);
aea(process.toFormula(["C", "Eb", "Gb", "Bb"]), [3, 3, 4, 2]);
aea(process.toFormula(["C", "Eb", "Gb", "A"]),  [3, 3, 3, 3]);
aea(process.toFormula(["C", "Eb", "G",  "B"]),  [3, 4, 4, 1]);
aea(process.toFormula(["C", "E",  "Ab", "B"]),  [4, 4, 3, 1]);
aea(process.toFormula(["C", "E",  "Gb", "Bb"]), [4, 2, 4, 2]);
aea(process.toFormula(["C", "E",  "Ab", "Bb"]), [4, 4, 2, 2]);
aea(process.toFormula(["C", "E",  "G",  "A"]),  [4, 3, 2, 3]);
aea(process.toFormula(["C", "Eb", "G",  "A"]),  [3, 4, 2, 3]);
aea(process.toFormula(["C", "E",  "G",  "F"]),  [4, 3, 10, 7]);
aea(process.toFormula(["C", "E",  "G",  "D"]),  [4, 3, 7, 10]);
aea(process.toFormula(["C", "Eb", "G",  "D"]),  [3, 4, 7, 10]);
aea(process.toFormula(["C", "E", "B",   "D"]),  [4, 7, 3, 10 ]);

aea(process.toFormula(["C", "D", "E", "F", "G", "A", "B"]), [2, 2, 1, 2, 2, 2, 1]);

// =========================================================================
//                          identify.chord() 
// =========================================================================
function testIdentify(){
    aea(identify.chord(new sounds.Chord([F, C])),  ['F 5', 'C sus4 no 5th' ]);
    aea(identify.chord(new sounds.Chord([C, E])),  ['C maj no 5th', 'A min no root' ]);
    aea(identify.chord(new sounds.Chord([C, Eb])), ['C min no 5th', 'Ab maj no root' ]);
    aea(identify.chord(new sounds.Chord([B, D])),  ['B min no 5th', 'G maj no root' ]);
    aea(identify.chord(new sounds.Chord([G, C])),  ['G sus4 no 5th', 'C 5' ]);
    aea(identify.chord(new sounds.Chord([E, Gb])), ['E sus2 no 5th', 'Gb 7 no(3rd, 5th)' ]);
    aea(identify.chord(new sounds.Chord([Db, C])), ['Db maj7 no(3rd, 5th)']);
    aea(identify.chord(new sounds.Chord([F, Eb])), ['F 7 no(3rd, 5th)', 'Eb sus2 no 5th' ]);
    aea(identify.chord(new sounds.Chord([Gb, C])), ['Gb b5 no 3rd', 'C b5 no 3rd' ]);

    aea(identify.chord(CEG),  ['C maj' ]);
    aea(identify.chord(CGE),  ['C maj' ]);
    aea(identify.chord(EGC),  ['C maj' ]);
    aea(identify.chord(ECG),  ['C maj' ]);
    aea(identify.chord(GEC),  ['C maj' ]);
    aea(identify.chord(GCE),  ['C maj' ]);
    aea(identify.chord(CEAb), ['C aug', 'E aug', 'Ab aug']);
    aea(identify.chord(CDG),  ['C sus2', 'G sus4']);
    aea(identify.chord(CFG),  ['C sus4', 'F sus2']);
    aea(identify.chord(ACE),  ['A min', 'C maj6 no 5th' ]);
    aea(identify.chord(ACEb), ['A dim', 'C dim7 no 5th', 'C min6 no 5th' ]);

    aea(identify.chord(new sounds.Chord([C, E,  G,  B])),  ['C maj7' ]);
    aea(identify.chord(new sounds.Chord([A, C,  E,  G])),  ['A min7', 'F maj9 no root', 'D 9 sus4 no root', 'C maj6' ]);
    aea(identify.chord(new sounds.Chord([C, Eb, G,  Bb])), ['C min7', 'Ab maj9 no root', 'F 9 sus4 no root', 'Eb maj6' ] );
    aea(identify.chord(new sounds.Chord([C, E,  G,  Bb])), ['C 7' ]);
    aea(identify.chord(new sounds.Chord([C, Eb, Gb, Bb])), ['C min7b5', 'Eb min6' ] );
    aea(identify.chord(new sounds.Chord([C, Eb, Gb, A])),  ['C dim7', 'Eb dim7', 'Gb dim7', 'A dim7' ]);
    aea(identify.chord(new sounds.Chord([C, Eb, G,  B])),  ['C minmaj7' ]);
    aea(identify.chord(new sounds.Chord([F, A,  C,  D])),  ['F maj6', 'D min7', 'Bb maj9 no root', 'G 9 sus4 no root' ]);
    aea(identify.chord(new sounds.Chord([F, Ab, C,  D])),  ['F min6', 'D min7b5' ]);
    aea(identify.chord(new sounds.Chord([G, B,  Eb, Gb])), ['G maj7#5' ]);
    aea(identify.chord(new sounds.Chord([G, B,  Db, F])),  ['G 7b5', 'Db 7b5' ]);
    aea(identify.chord(new sounds.Chord([G, B,  Eb, F])),  ['G 7#5' ]);
    aea(identify.chord(new sounds.Chord([C, E,  G,  D])),  ['C maj add2' ]);
    aea(identify.chord(new sounds.Chord([D, G,  E,  C])),  ['C maj add2' ]);
    aea(identify.chord(new sounds.Chord([C, E,  G,  F])),  ['C maj add4' ]);
    aea(identify.chord(new sounds.Chord([C, E,  Bb, D])),  ['C 9 no 5th']);
    aea(identify.chord(new sounds.Chord([D, F,  C,  E])),  ['D min9 no 5th']);
    aea(identify.chord(new sounds.Chord([C, E,  A,  D])),  ['C 6/9 no 5th']);

    aea(identify.chord(new sounds.Chord([C,  E,  G,  A,  D])),  ['C 6/9']);
    aea(identify.chord(new sounds.Chord([D,  F,  A,  C,  E])),  ['D min9']);
}

// =========================================================================
//                         harmony.harmonize() 
// =========================================================================
function testHarmonize(){
    ae(harmony.harmonize(CM, 3).getChordsNotesAsString() ===
        "< C E G > < D F A > < E G B > < F A C > < G B D > < A C E > < B D F > ");
    aea(harmony.harmonize(CM, 3, 1), [ 'C maj', 'D min', 'E min', 'F maj', 'G maj', 'A min', 'B dim' ]);
    aea(harmony.harmonize(CM, 4, 1), [ 'C maj7', 'D min7', 'E min7', 'F maj7', 'G 7', 'A min7', 'B min7b5' ]);
    aea(harmony.harmonize(new sounds.Scale([C, D, Eb, F, G, Ab, B]), 4, 1),
                         [ 'C minmaj7', 'D min7b5', 'Eb maj7#5', 'F min7', 'G 7', 'Ab maj7', 'B dim7' ]);
    aea(harmony.harmonize(new sounds.Scale([C, D, Eb, F, G, A, B]), 4, 1),
                         [ 'C minmaj7', 'D min7', 'Eb maj7#5', 'F 7', 'G 7', 'A min7b5', 'B min7b5' ]);
}

// Perform tests:
testIdentify();
testHarmonize();

// Print results to console:
console.log();
if (numberOfErrors === 0)
    console.log("All tests passed :D");
else
    console.log("Number of errors: " + numberOfErrors);
console.log();















