/* jslint node: true */
"use strict";

// ===== imports =====

var sounds      = require("./sounds");
var processing  = require("./processing");
var formulas    = require("./formulas");
var harmony     = require("./harmony");
var identify    = require("./identify");

// ==== compare and assert functions ===

var numberOfErrors = 0;               // to keep track of the number of errors
var equals = processing.arraysEqual;  // checks equality for arrays

/** Assert equals for two arrays. */
var aea = function(a, b){
    if (!(a instanceof Array) || !(b instanceof Array)){
        throw new TypeError("arguments must be of type Array");
    }
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

/** Assert equals. */
var ae = function(a, b){
    try{
        console.assert(a === b);
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

/** Assert difference. */
var adiff = function(a, b){
    try{
        console.assert(a !== b);
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

// =========================================================================
//                                Note
// =========================================================================
function testNote() {
    var A1 = new sounds.Note("A", 440.000, 4, "La"),
        H1 = new sounds.Note("H", 500.011, 8, ":D" ),
        J1 = new sounds.Note({freq: 1000, octave: 1}),
        F1 = new sounds.Note({name: "F1", name2: "1F"}),
        A3 = new sounds.Note("A", 440.000, 3, "Lo"),
        A2 = A1.copy(),
        M1 = new sounds.Note();
    
    ae(M1.getName(), "");
    ae(M1.getName2(), "");
    ae(M1.getOctave(), 0);
    ae(M1.getFreq(), 0);
    ae(F1.getName(), "F1");
    ae(F1.getName2(), "1F");
    ae(F1.getFreq(), 0);
    ae(F1.getOctave(), 0);
    ae(J1.getName(), "");
    ae(J1.getName2(), "");
    ae(J1.getFreq(), 1000);
    ae(J1.getOctave(), 1);
    ae(A1.getName(), "A");
    ae(A1.getFreq(), 440.000);
    ae(A1.getOctave(), 4);
    ae(A1.toString(), "<A La>");
    ae(A1.equals(A2), true);
    ae(H1.equals(A2), false);
    ae(A1.equals(1), false);
    ae(A1.equals(false), false);
    ae(A1.equals("foo"), false);
    ae(A3.equals(A1), false);
    ae(A3.equals({}), false);
    adiff(A1, A2);
}

// =========================================================================
//                            NoteCollection
// =========================================================================
function testNoteCollection() {
    var A  = new sounds.Note("A",  440.000, 4, "La"),
        B  = new sounds.Note("B",  493.883, 4, "Si"),
        C  = new sounds.Note("C",  523.251, 5, "Do"),
        D  = new sounds.Note("D",  587.330, 5, "Re"),
        E  = new sounds.Note("E",  659.255, 5),
        F  = new sounds.Note("F",  698.456, 5),
        G  = new sounds.Note("G",  783.991, 5, "Sol"),
        Ab = new sounds.Note("Ab", 830.609, 5),
        ABC  = new sounds.NoteCollection([A, B, C], "ABC"),
        ABC2 = ABC.copy(),
        ABC4 = ABC.deepCopy(),
        ABC3 = new sounds.NoteCollection([A, B, C], "name"),
        BCA  = new sounds.NoteCollection([B, C, A], "ABC"),
        GAbC = new sounds.NoteCollection([G, Ab, C], "GAbC"),
        CDE  = new sounds.NoteCollection({name: "CDE", name2: "DoReMi", notes: [C, D, E]}),
        DEF  = new sounds.NoteCollection({name2: "DEF"}),
        EFG  = new sounds.NoteCollection({notes: [E, F, G]}),
        JJJ  = new sounds.NoteCollection(),
        BCD  = new sounds.NoteCollection([B, C, D], "BCD");

    // Accessors
    ae(JJJ.getSize(), 0);
    ae(JJJ.getName(), "");
    ae(JJJ.getName2(), "");
    aea(JJJ.getNotes(), []);
    ae(ABC.getSize(), 3);
    ae(ABC.getName(), "ABC");
    ae(ABC.getName2(), "");
    aea(ABC.getNotes(), [A, B, C]);
    aea(ABC.toIndexes(), [9, 11, 0]);
    aea(GAbC.toIndexes(), [7, 8, 0]);
    aea(ABC.toFormula(), [2, 1, 9]);
    ae(CDE.getName(), "CDE");
    ae(CDE.getName2(), "DoReMi");
    aea(CDE.getNotes(), [C, D, E]);
    aea(DEF.getNotes(), []);
    ae(DEF.getName(), "");
    ae(EFG.getName2(), "");

    // equals()
    ae(ABC2.equals(ABC), true);
    ae(ABC.equals(BCD), false);
    ae(ABC.equals("!¡!"), false);

    // noteEquals()
    ae(ABC.noteEquals(ABC2.getNotes()), true);
    ae(ABC.noteEquals(BCD.getNotes()), false);
    ae(ABC3.noteEquals(ABC.getNotes()), true);
    ae(ABC3.noteEquals([A, B, C]), true);
    ae(ABC3.noteEquals([A, B, D]), false);
    ae(ABC2.noteEquals(1), false);

    // strictEquals()
    ae(ABC.strictEquals(ABC2), true);
    BCA.rotateBack();
    ae(BCA.strictEquals(ABC), false);
    ae(BCA.equals(ABC), true);

    // deepCopy()
    // Check for note equality.
    ae(ABC.equals(ABC4), true);
    ae(ABC4.strictEquals(ABC), true);
    // Check for reference difference.
    ae((function(){
            var index,
                ABCNotes  = ABC.getNotes(),
                ABC4Notes = ABC4.getNotes();
            for (index = 0; index < ABCNotes.length; index += 1) {
                if (ABCNotes[index] === ABC4Notes[index]) {
                    return false;
                }
            }
            return true;
        }()),
        true);
        
    // Mutation:
    BCD.addNote(E);
    aea(BCD.getNotes() , [B, C, D, E]);
    ae(BCD.getSize() , 4);
    BCD.reset();
    ae(BCD.getSize() , 3);
    aea(BCD.getNotes() , [B, C, D]);
    BCD.setNotes([D, E]);
    ae(BCD.getSize() , 2);
    aea(BCD.getNotes() , [D, E]);
    BCD.reset();
    ae(BCD.getSize() , 3);
    aea(BCD.getNotes() , [B, C, D]);
    BCD.reverse();
    ae(BCD.getSize() , 3);
    aea(BCD.getNotes() , [D, C, B]);
    BCD.rotate();
    aea(BCD.getNotes() , [C, B, D]);
    BCD.removeNoteAt(1);
    aea(BCD.getNotes() , [C, D]);
    ae(BCD.getSize() , 2);
    ae(BCD.getNotesAsString() , "C D ");
    ae(BCD.getOriginalNotesAsString() , "B C D ");
    ae(BCD.getFreqsAsString() , "523.251 587.33 ");
    BCD.setName("C D");
    BCD.setName2("secondary name");
    ae(BCD.getName() , "C D");
    ae(BCD.getName2() , "secondary name");
    BCD.setNotes([C, A, B, A2, A3, G, C, A2]);
    ae(BCD.getNotesAsString() , "C A B A A G C A ");
    ae(BCD.getSize() , 8);
    BCD.removeNotesWithName("A");
    ae(BCD.getNotesAsString() , "C B G C ");
    ae(BCD.getSize() , 4);
    BCD.setNotes([C, A, B, A2, A3, G, C, A2]);
    BCD.removeNotesWithFreq(440);
    ae(BCD.getNotesAsString() , "C B G C ");
    ae(BCD.getSize() , 4);
    BCD.removeNotesWithName2("Do");
    ae(BCD.getNotesAsString() , "B G ");
    ae(BCD.getSize() , 2);
    BCD.reset();
    ae(BCD.getSize() , 3);
    aea(BCD.getNotes() , [B, C, D]);
    BCD.rotateBack();
    aea(BCD.getNotes() , [D, B, C]);
    BCD.rotateBack();
    aea(BCD.getNotes() , [C, D, B]);
    BCD.rotateBack();
    aea(BCD.getNotes() , [B, C, D]);
    BCD.rotate();
    aea(BCD.getNotes() , [C, D, B]);
    BCD.rotate();
    aea(BCD.getNotes() , [D, B, C]);
    BCD.rotate();
    aea(BCD.getNotes() , [B, C, D]);
    BCD.setNotes([A, B, C, D, E, F, G]);
    ae(BCD.getSize() , 7, "43");
    aea(BCD.getNotes() , [A, B, C, D, E, F, G]);
    BCD.removeNotesWithFreqRange(490, 700);
    ae(BCD.getSize() , 2, "45");
    aea(BCD.getNotes() , [A, G]);
}

// =========================================================================
//                                 Chord 
// =========================================================================
aea(CEG.toIndexes(), [0, 4, 7]);
ae(CEG.getNotesAsString() , "C E G ");
CEG.invert(1);
ae(CEG.getNotesAsString() , "E G C ");
CEG.invert(1);
ae(CEG.getNotesAsString() , "G C E ");
CEG.invert(1);
ae(CEG.getNotesAsString() , "C E G ");
CEG.invert(-1);
ae(CEG.getNotesAsString() , "G C E ");
CEG.invert(-1);
ae(CEG.getNotesAsString() , "E G C ");
CEG.invert(-1);
ae(CEG.getNotesAsString() , "C E G ");
CEG.invert(2);
ae(CEG.getNotesAsString() , "G C E ");
CEG.invert(-1);
ae(CEG.getNotesAsString() , "E G C ");
CEG.invert(-2);
ae(CEG.getNotesAsString() , "G C E ");
CEG.reset();
ae(CEG.getNotesAsString() , "C E G ");


// =========================================================================
//                                Scale
// =========================================================================
aea(CM.toFormula(), [2,2,1,2,2,2,1]);

// =========================================================================
//                            ChordCollection
// =========================================================================
var testChordCollection = function () {
    var A  = new sounds.Note("A",  440.000, 4, "La"),
        Bb = new sounds.Note("Bb", 466.164, 4),
        B  = new sounds.Note("B",  493.883, 4, "Si"),
        C  = new sounds.Note("C",  523.251, 5, "Do"),
        Db = new sounds.Note("Db", 554.365, 5),
        D  = new sounds.Note("D",  587.330, 5, "Re"),
        Eb = new sounds.Note("Eb", 622.254, 5),
        E  = new sounds.Note("E",  659.255, 5),
        F  = new sounds.Note("F",  698.456, 5),
        Gb = new sounds.Note("Gb", 739.989, 5),
        G  = new sounds.Note("G",  783.991, 5, "Sol"),
        Ab = new sounds.Note("Ab", 830.609, 5),
        CEG  = new sounds.Chord([C, E, G], "C major"),
        ACE  = new sounds.Chord([A, C, E], "A minor"),
        FAC  = new sounds.Chord([F, A, C], "F major"),
        DFA  = new sounds.Chord([D, F, A], "D minor"),
        chc1 = new sounds.ChordCollection([CEG, ACE, FAC], "chc1", "lala"),
        chc3 = new sounds.ChordCollection(),
        chc4 = new sounds.ChordCollection([DFA, FAC, ACE, CEG], "chc4"),
        chc5 = new sounds.ChordCollection({chords: [CEG, DFA]}),
        chc6 = chc5.deepCopy(),
        chc2 = chc1.copy();

    ae(chc3.getName(), "");
    aea(chc3.getChords(), []);
    ae(chc1.getChordsNames(), "C major A minor F major ");
    ae(chc1.getSize(), 3);
    ae(chc1.getName2(), "lala");
    aea(chc4.getChords(), [DFA, FAC, ACE, CEG]);
    ae(chc5.getName(), "");
    ae(chc1.equals(chc2), true);
    ae(chc1.equals([]), false);
    ae(chc4.equals(chc1), false);
    ae(chc2.equals(chc3), false);

    // Check if deep copy: (chord equality and reference difference)
    // Checks that members of collections are equal, while not being the
    // same object:
    ae(chc5.equals(chc6), true);
    ae(function () {
           var chordIndex,
               noteIndex,
               chc5Chord,
               chc6Chord,
               chc5ChordNotes,
               chc6ChordNotes,
               chc5Chords = chc5.getChords(),
               chc6Chords = chc6.getChords();
           for (chordIndex = 0; chordIndex < chc5Chords.length; chordIndex += 1) {
               chc5Chord = chc5Chords[chordIndex];
               chc6Chord = chc6Chords[chordIndex];
               if (chc5Chord === chc6Chord) {
                   return false;
               }
               chc5ChordNotes = chc5Chord.getNotes();
               chc6ChordNotes = chc6Chord.getNotes();
               for (noteIndex = 0; noteIndex < chc5ChordNotes.length; noteIndex += 1) {
                   if (chc5ChordNotes[noteIndex] === chc6ChordNotes[noteIndex]) {
                       return false;
                   }
                   if (!chc5ChordNotes[noteIndex].equals(chc6ChordNotes[noteIndex])){
                       return false;
                   }
               }
           }
           return true;
       }(),
       true);

};
// =========================================================================
//                               Harmony
// =========================================================================
ae(h1.getChordsNames(), "C major A minor F major ");

// NoteCollection.toFormula()
aea(CEG.toFormula()  , [4 ,3, 5]);
aea(FAC.toFormula()  , [4, 3, 5]);
aea(ACE.toFormula()  , [3, 4, 5]);
aea(DFA.toFormula()  , [3, 4, 5]);
aea(CEGB.toFormula() , [4, 3, 4, 1]);
aea(FACE.toFormula() , [4, 3, 4, 1]);
aea(ACEG.toFormula() , [3, 4, 3, 2]);
aea(DFAC.toFormula() , [3, 4, 3, 2]);
aea(CFG.toFormula()  , [5, 2, 5]);
aea(CDG.toFormula()  , [2, 5, 5]);

// processing stepCount
ae(processing.stepCount(A, Bb) , 1);
ae(processing.stepCount(A, B)  , 2);
ae(processing.stepCount(G, Ab) , 1);
ae(processing.stepCount(D, Db) , 11);

// processing scalize
ae(processing.scalize(C, formulas.MAJOR).getNotesAsString() , "C D E F G A B ");
ae(processing.scalize(C, formulas.MINOR).getNotesAsString() , "C D Eb F G Ab Bb ");

// processing buildInversions
var CEGinvs  = processing.buildInversions(CEG);
var CEGinvs2 = [];
for (var i = 0; i < CEGinvs.length; i++)
    CEGinvs2[i] = CEGinvs[i].getNotesAsString();
aea(CEGinvs2, ['C E G ', 'E G C ', 'G C E ']);

// processing arraysEqual
ae(equals([1, 2], [1, 2])    , true);
ae(equals([1, 3, 4], [1, 2]) , false);

// processing.buildPermutations()
var buildPermutations1    = processing.buildPermutations(CEG);
var buildPermutations1Str = "";
for (var i = 0; i < buildPermutations1.length; i++)
    buildPermutations1Str += buildPermutations1[i].getNotesAsString() + " ";
ae(buildPermutations1Str , "C E G  C G E  E C G  E G C  G C E  G E C  ");

// =========================================================================
//                      processing.fromFormulaToNotes
// =========================================================================
function testFromFormulaToNotes(){
    aea(processing.fromFormulaToNotes([4, 3, 4]), ['C', 'E', 'G', 'B' ]);
    aea(processing.fromFormulaToNotes([3, 4, 3]), ['C', 'Eb', 'G', 'Bb' ]);
    aea(processing.fromFormulaToNotes([4, 3, 4], "F"), ['F', 'A', 'C', 'E' ]);
}

// =========================================================================
//                         processing.toFormula() 
// =========================================================================
function testToFormula(){
    aea(processing.toFormula(["C", "E",  "B"]),  [4, 7, 1 ]);
    aea(processing.toFormula(["C", "Eb", "Bb"]), [3, 7, 2 ]);
    aea(processing.toFormula(["C", "E",  "Bb"]), [4, 6, 2 ]);
    aea(processing.toFormula(["C", "Eb", "A"]),  [3, 6, 3 ]);
    aea(processing.toFormula(["C", "Eb", "B"]),  [3, 8, 1 ]);
    aea(processing.toFormula(["C", "E",  "A"]),  [4, 5, 3 ]);
    aea(processing.toFormula(["C", "Eb", "A"]),  [3, 6, 3 ]);
    aea(processing.toFormula(["C", "E",  "D"]),  [4, 10, 10 ]);
    aea(processing.toFormula("A", "C",  "E"),    [3, 4, 5 ]);
    aea(processing.toFormula(F, A, C),           [4, 3, 5]);
    aea(processing.toFormula([C, Eb, Gb]),       [3, 3, 6 ]);
    aea(processing.toFormula(CEAb),              [4, 4, 4]);
    aea(processing.toFormula(CEAb, ["C", "E", "Ab"]),             [1, 1, 1]);
    aea(processing.toFormula("C", "D", "E", formulas.ET12POOL),   [2, 2, 8]);
    aea(processing.toFormula(C, F, G, ["C", "F", "J", "G", "H"]), [1, 2, 2]);

    aea(processing.toFormula(["C", "E",  "G",  "B"]),  [4, 3, 4, 1]);
    aea(processing.toFormula(["C", "Eb", "G",  "Bb"]), [3, 4, 3, 2]);
    aea(processing.toFormula(["C", "E",  "G",  "Bb"]), [4, 3, 3, 2]);
    aea(processing.toFormula(["C", "Eb", "Gb", "Bb"]), [3, 3, 4, 2]);
    aea(processing.toFormula(["C", "Eb", "Gb", "A"]),  [3, 3, 3, 3]);
    aea(processing.toFormula(["C", "Eb", "G",  "B"]),  [3, 4, 4, 1]);
    aea(processing.toFormula(["C", "E",  "Ab", "B"]),  [4, 4, 3, 1]);
    aea(processing.toFormula(["C", "E",  "Gb", "Bb"]), [4, 2, 4, 2]);
    aea(processing.toFormula(["C", "E",  "Ab", "Bb"]), [4, 4, 2, 2]);
    aea(processing.toFormula(["C", "E",  "G",  "A"]),  [4, 3, 2, 3]);
    aea(processing.toFormula(["C", "Eb", "G",  "A"]),  [3, 4, 2, 3]);
    aea(processing.toFormula(["C", "E",  "G",  "F"]),  [4, 3, 10, 7]);
    aea(processing.toFormula(["C", "E",  "G",  "D"]),  [4, 3, 7, 10]);
    aea(processing.toFormula(["C", "Eb", "G",  "D"]),  [3, 4, 7, 10]);
    aea(processing.toFormula(["C", "E", "B",   "D"]),  [4, 7, 3, 10 ]);

    aea(processing.toFormula(["C", "D", "E", "F", "G", "A", "B"]), [2, 2, 1, 2, 2, 2, 1]);
}

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

    aea(identify.chord(C, E, G),         ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    aea(identify.chord("C", "G", "E"),   ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    aea(identify.chord([E, G, C]),       ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    aea(identify.chord(["E", "C", "G"]), ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    aea(identify.chord(GEC),             ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    aea(identify.chord(GCE),             ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    aea(identify.chord(CEAb),            ['C aug','A minmaj7 no root', 'E aug', 'Db minmaj7 no root', 'Ab aug', 'F minmaj7 no root' ]);
    aea(identify.chord(CDG),             ['C sus2', 'Ab maj7b5 no root', 'G sus4', 'E min7#5 no root']);
    aea(identify.chord(CFG),             ['C sus4', 'A min7#5 no root', 'F sus2', 'Db maj7b5 no root']);
    aea(identify.chord(ACE),             ['A min', 'F maj7 no root', 'Gb min7b5 no root', 'C maj6 no 5th']);
    aea(identify.chord(ACEb),            ['A dim', 'F 7 no root', 'Gb dim7 no root', 'C dim7 no 5th', 'C min6 no 5th' ]);
    aea(identify.chord(E, Gb, Bb),       ['C 7b5 no root', 'Gb 7 no 5th']);
    aea(identify.chord("E", "Ab", "Bb"), ['C 7#5 no root']);

    aea(identify.chord(new sounds.Chord([C, E,  G,  B])),  ['C maj7' ]);
    aea(identify.chord(new sounds.Chord([A, C,  E,  G])),  ['A min7', 'F maj9 no root', 'D 9 sus4 no root', 'C maj6' ]);
    aea(identify.chord(new sounds.Chord([A, C,  Eb, G])),  ['A min7b5', 'F 9 no root', 'C min6']);
    aea(identify.chord(new sounds.Chord([C, Eb, G,  Bb])), ['C min7', 'Ab maj9 no root', 'F 9 sus4 no root', 'Eb maj6' ] );
    aea(identify.chord(new sounds.Chord([C, E,  G,  Bb])), ['C 7' ]);
    aea(identify.chord(new sounds.Chord([C, Eb, Gb, Bb])), ['C min7b5', 'Ab 9 no root', 'Eb min6']);
    aea(identify.chord(new sounds.Chord([C, Eb, Gb, A])),  ['C dim7', 'Eb dim7', 'Gb dim7', 'A dim7' ]);
    aea(identify.chord(new sounds.Chord([C, Eb, G,  B])),  ['C minmaj7' ]);
    aea(identify.chord(new sounds.Chord([F, A,  C,  D])),  ['F maj6', 'D min7', 'Bb maj9 no root', 'G 9 sus4 no root' ]);
    aea(identify.chord(new sounds.Chord([F, Ab, C,  D])),  ['F min6', 'D min7b5', 'Bb 9 no root']);
    aea(identify.chord(new sounds.Chord([G, B,  Eb, Gb])), ['G maj7#5' ]);
    aea(identify.chord(new sounds.Chord([G, B,  Db, F])),  ['G 7b5', 'Db 7b5' ]);
    aea(identify.chord(new sounds.Chord([G, B,  Eb, F])),  ['G 7#5' ]);
    aea(identify.chord(new sounds.Chord([C, E,  G,  D])),  ['C maj add2', 'E min7#5' ]);
    aea(identify.chord(new sounds.Chord([D, G,  E,  C])),  ['E min7#5', 'C maj add2' ]);
    aea(identify.chord(new sounds.Chord([C, E,  G,  F])),  ['C maj add4' ]);
    aea(identify.chord(new sounds.Chord([C, E,  Bb, D])),  ['C 9 no 5th']);
    aea(identify.chord(new sounds.Chord([D, F,  C,  E])),  ['D min9 no 5th']);
    aea(identify.chord(new sounds.Chord([C, E,  A,  D])),  ['C 6/9 no 5th']);
    aea(identify.chord("C", "E", "Gb", "B"),               ['C maj7b5']);

    aea(identify.chord(new sounds.Chord([C,  E,  G,  A,  D])),  ['C 6/9', 'D 9 sus4']);
    aea(identify.chord(new sounds.Chord([D,  F,  A,  C,  E])),  ['D min9']);
    aea(identify.chord(new sounds.Chord([D,  Gb, A,  C,  E])),  ['D 9']);
    aea(identify.chord(new sounds.Chord([F,  A,  C,  E,  G])),  ['F maj9']);
    aea(identify.chord(new sounds.Chord([C,  F,  G,  Bb, D])),  ['C 9 sus4', 'Bb 6/9']);
}

// =========================================================================
//                         harmony.harmonize() 
// =========================================================================
function testHarmonize(){
    ae(harmony.harmonize(CM, 3).getChordsNotesAsString() ,
        "< C E G > < D F A > < E G B > < F A C > < G B D > < A C E > < B D F > ");
    aea(harmony.harmonize(CM, 3, 1), [ 'C maj', 'D min', 'E min', 'F maj', 'G maj', 'A min', 'B dim' ]);
    aea(harmony.harmonize(CM, 4, 1), [ 'C maj7', 'D min7', 'E min7', 'F maj7', 'G 7', 'A min7', 'B min7b5' ]);
    aea(harmony.harmonize(new sounds.Scale([C, D, Eb, F, G, Ab, B]), 4, 1),
                         [ 'C minmaj7', 'D min7b5', 'Eb maj7#5', 'F min7', 'G 7', 'Ab maj7', 'B dim7' ]);
    aea(harmony.harmonize(new sounds.Scale([C, D, Eb, F, G, A, B]), 4, 1),
                         [ 'C minmaj7', 'D min7', 'Eb maj7#5', 'F 7', 'G 7', 'A min7b5', 'B min7b5' ]);
}

// Perform tests:
testNote();
testNoteCollection();
testChordCollection();
testToFormula();
testIdentify();
testHarmonize();
testFromFormulaToNotes();

// Print results to console:
console.log();
if (numberOfErrors === 0)
    console.log("All tests passed :D");
else
    console.log("Number of errors: " + numberOfErrors);
console.log();















