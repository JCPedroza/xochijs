var identify   = require("../identify"),
    sounds     = require("../sounds"),
    processing = require("../processing"),
    testTools  = require("./testTools");

// =========================================================================
//                          identify.chord() 
// =========================================================================
function testIdentify(){

    // Declarations:

    var tester = new testTools.Tester(),
        A  = new sounds.Note("A",  440.000, 4, "La"),
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
        Ab = new sounds.Note("Ab", 830.609, 5);

    // Tests:

    tester.aea(identify.chord(new sounds.Chord([F, C])),  ['F 5', 'C sus4 no 5th' ]);
    tester.aea(identify.chord(new sounds.Chord([C, E])),  ['C maj no 5th', 'A min no root' ]);
    tester.aea(identify.chord(new sounds.Chord([C, Eb])), ['C min no 5th', 'Ab maj no root' ]);
    tester.aea(identify.chord(new sounds.Chord([B, D])),  ['B min no 5th', 'G maj no root' ]);
    tester.aea(identify.chord(new sounds.Chord([G, C])),  ['G sus4 no 5th', 'C 5' ]);
    tester.aea(identify.chord(new sounds.Chord([E, Gb])), ['E sus2 no 5th', 'Gb 7 no(3rd, 5th)' ]);
    tester.aea(identify.chord(new sounds.Chord([Db, C])), ['Db maj7 no(3rd, 5th)']);
    tester.aea(identify.chord(new sounds.Chord([F, Eb])), ['F 7 no(3rd, 5th)', 'Eb sus2 no 5th' ]);
    tester.aea(identify.chord(new sounds.Chord([Gb, C])), ['Gb b5 no 3rd', 'C b5 no 3rd' ]);

    tester.aea(identify.chord(C, E, G),         ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    tester.aea(identify.chord("C", "G", "E"),   ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    tester.aea(identify.chord([E, G, C]),       ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    tester.aea(identify.chord(["E", "C", "G"]), ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    tester.aea(identify.chord(E, Gb, Bb),       ['C 7b5 no root', 'Gb 7 no 5th']);
    tester.aea(identify.chord("E", "Ab", "Bb"), ['C 7#5 no root']);
    tester.aea(identify.chord(new sounds.Chord([G, E, C])),  ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    tester.aea(identify.chord(new sounds.Chord([G, C, E])),  ['C maj', 'A min7 no root', 'Ab maj7#5 no root']);
    tester.aea(identify.chord(new sounds.Chord([C, E, Ab])), ['C aug','A minmaj7 no root', 'E aug', 'Db minmaj7 no root', 'Ab aug', 'F minmaj7 no root' ]);
    tester.aea(identify.chord(new sounds.Chord([C, D, G])),  ['C sus2', 'Ab maj7b5 no root', 'G sus4', 'E min7#5 no root']);
    tester.aea(identify.chord(new sounds.Chord([C, F, G])),  ['C sus4', 'A min7#5 no root', 'F sus2', 'Db maj7b5 no root']);
    tester.aea(identify.chord(new sounds.Chord([A, C, E])),  ['A min', 'F maj7 no root', 'Gb min7b5 no root', 'C maj6 no 5th']);
    tester.aea(identify.chord(new sounds.Chord([A, C, Eb])), ['A dim', 'F 7 no root', 'Gb dim7 no root', 'C dim7 no 5th', 'C min6 no 5th' ]);

    tester.aea(identify.chord(new sounds.Chord([C, E,  G,  B])),  ['C maj7' ]);
    tester.aea(identify.chord(new sounds.Chord([A, C,  E,  G])),  ['A min7', 'F maj9 no root', 'D 9 sus4 no root', 'C maj6' ]);
    tester.aea(identify.chord(new sounds.Chord([A, C,  Eb, G])),  ['A min7b5', 'F 9 no root', 'C min6']);
    tester.aea(identify.chord(new sounds.Chord([C, Eb, G,  Bb])), ['C min7', 'Ab maj9 no root', 'F 9 sus4 no root', 'Eb maj6' ] );
    tester.aea(identify.chord(new sounds.Chord([C, E,  G,  Bb])), ['C 7' ]);
    tester.aea(identify.chord(new sounds.Chord([C, Eb, Gb, Bb])), ['C min7b5', 'Ab 9 no root', 'Eb min6']);
    tester.aea(identify.chord(new sounds.Chord([C, Eb, Gb, A])),  ['C dim7', 'Eb dim7', 'Gb dim7', 'A dim7' ]);
    tester.aea(identify.chord(new sounds.Chord([C, Eb, G,  B])),  ['C minmaj7' ]);
    tester.aea(identify.chord(new sounds.Chord([F, A,  C,  D])),  ['F maj6', 'D min7', 'Bb maj9 no root', 'G 9 sus4 no root' ]);
    tester.aea(identify.chord(new sounds.Chord([F, Ab, C,  D])),  ['F min6', 'D min7b5', 'Bb 9 no root']);
    tester.aea(identify.chord(new sounds.Chord([G, B,  Eb, Gb])), ['G maj7#5' ]);
    tester.aea(identify.chord(new sounds.Chord([G, B,  Db, F])),  ['G 7b5', 'Db 7b5' ]);
    tester.aea(identify.chord(new sounds.Chord([G, B,  Eb, F])),  ['G 7#5' ]);
    tester.aea(identify.chord(new sounds.Chord([C, E,  G,  D])),  ['C maj add2', 'E min7#5' ]);
    tester.aea(identify.chord(new sounds.Chord([D, G,  E,  C])),  ['E min7#5', 'C maj add2' ]);
    tester.aea(identify.chord(new sounds.Chord([C, E,  G,  F])),  ['C maj add4', 'G 13 no 3, 5, 9', 'F maj9 no 3', 'D min11 no R, 5']);
    tester.aea(identify.chord(new sounds.Chord([C, E,  Bb, D])),  ['C 9 no 5th']);
    tester.aea(identify.chord(new sounds.Chord([D, F,  C,  E])),  ['D min9 no 5th']);
    tester.aea(identify.chord(new sounds.Chord([C, E,  A,  D])),  ['C 6/9 no 5th']);
    tester.aea(identify.chord("C", "E", "Gb", "B"), ['C maj7b5']);
    tester.aea(identify.chord("C", "D", "Eb", "B"), ['C minmaj9 no 5th', 'D 13b9 no 3, 5, 11']);
    tester.aea(identify.chord("D", "Eb", "B", "C"), ['D 13b9 no 3, 5, 11', 'C minmaj9 no 5th']);
    tester.aea(identify.chord(['C', 'D', 'E', 'B' ]), ["C maj9 no 5th", 'D 13 no 3, 5, 11' ]);
    tester.aea(identify.chord(['G', 'Bb', 'E', 'F' ]), ["G min13 no 5, 9, 11", "C 11 no R, 9"]);
    tester.aea(identify.chord(['C', 'E', 'A', 'Bb' ]), ["C 13 no 5, 9, 11", "Gb 7#9b5 no R"]);
    tester.aea(identify.chord([C, D, G, B]), ['C maj9 no 3', 'A min11 no R, 5', 'D 13 no 3, 5, 9', 'G maj add4']);

    tester.aea(identify.chord(new sounds.Chord([C,  E,  G,  A,  D])),  ['C 6/9', 'D 9 sus4']);
    tester.aea(identify.chord(new sounds.Chord([D,  F,  A,  C,  E])),  ['D min9']);
    tester.aea(identify.chord(new sounds.Chord([D,  Gb, A,  C,  E])),  ['D 9']);
    tester.aea(identify.chord(new sounds.Chord([F,  A,  C,  E,  G])),  ['F maj9']);
    tester.aea(identify.chord(new sounds.Chord([C,  F,  G,  Bb, D])),  ['C 9 sus4', 'Bb 6/9']);

    tester.report("identifyChordTests");
}

exports.testIdentify = testIdentify;