// ===========================================
//              Scale Formulas
// ===========================================

// Formulas for pentatonic scales
exports.MINOR_PENTATONIC = [3, 2, 2, 3, 2];  // minor pentatonic
exports.MAJOR_PENTATONIC = [2, 2, 3, 2, 3];  // major pentatonic

// Formulas for hexatonic scales
exports.MINOR_BLUES          = [3, 2, 1, 1, 3, 2];  // minor blues 
exports.MAJOR_BLUES          = [2, 1, 1, 3, 2, 3];  // major blues
exports.PROMETHEUS           = [2, 2, 2, 3, 1, 2];  // prometheus - mystic
exports.ISTRIAN              = [1, 2, 1, 2, 1, 5];  // istrian
exports.WHOLE_TONE           = [2, 2, 2, 2, 2, 2];  // whole tone
exports.AUGMENTED            = [3, 1, 3, 1, 3, 1];  // augmented - symmetrical augmented
exports.TRITONE              = [1, 3, 2, 1, 3, 2];  // tritone 
exports.TWO_SEMITONE_TRITONE = [1, 1, 4, 1, 1, 4];  // two semitone tritone 

// Major derived formulas
exports.LYDIAN     = [2, 2, 2, 1, 2, 2, 1];  // lydian
exports.IONIAN     = [2, 2, 1, 2, 2, 2, 1];  // ionian - major
exports.MIXOLYDIAN = [2, 2, 1, 2, 2, 1, 2];  // mixolydian
exports.DORIAN     = [2, 1, 2, 2, 2, 1, 2];  // dorian
exports.AEOLIAN    = [2, 1, 2, 2, 1, 2, 2];  // aeolian - minor
exports.PHRYGIAN   = [1, 2, 2, 2, 1, 2, 2];  // phrygian
exports.LOCRIAN    = [1, 2, 2, 1, 2, 2, 2];  // locrian
exports.MAJOR      = [2, 2, 1, 2, 2, 2, 1];  // ionian alias
exports.MINOR      = [2, 1, 2, 2, 1, 2, 2];  // aeolian alias

// Melodic minor derived formulas
exports.MELODIC_MINOR     = [2, 1, 2, 2, 2, 2, 1]; // melodic minor
exports.DORIAN_FLAT9      = [1, 2, 2, 2, 2, 1, 2]; // dorian flat 9
exports.LYDIAN_AUGMENTED  = [2, 2, 2, 2, 1, 2, 1]; // lydian augmented
exports.LYDIAN_FLAT7      = [2, 2, 2, 1, 2, 1, 2]; // lydian flat 7
exports.MIXOLYDIAN_FLAT13 = [2, 2, 1, 2, 1, 2, 2]; // mixolydian flat 13
exports.SEMI_LOCRIAN      = [2, 1, 2, 1, 2, 2, 2]; // semilocrian
exports.SUPER_LOCRIAN     = [1, 2, 1, 2, 2, 2, 2]; // superlocrian

// Harmonic minor derived formulas
exports.HARMONIC_MINOR   = [2, 1, 2, 2, 1, 3, 1]; // harmonic minor
exports.LOCRIAN_SHARP7   = [1, 2, 2, 1, 3, 1, 2]; // locrian sharp 7
exports.IONIAN_AUGMENTED = [2, 2, 1, 3, 1, 2, 1]; // ionian augmented

// ===========================================
//               Chord Formulas
// ===========================================
// http://music.stackexchange.com/questions/11659/what-determines-a-chords-name/
// !!! https://en.wikipedia.org/wiki/Chord_names_and_symbols_%28jazz_and_pop_music%29#Seventh_chords

// !!! 7th chords with no 5th or no root?
var threeNoteChords = {
    // Triads:
    "maj"             : [4, 3],  // Major triad
    "min"             : [3, 4],  // Minor triad
    "aug"             : [4, 4],  // Augmented triad
    "dim"             : [3, 3],  // Diminished triad
    // Sus trichords:
    "sus4"            : [5, 2],  // Suspended fourth trichord
    "sus2"            : [2, 5],  // Suspended second trichord
    // 7th no 5th trichords:
    "maj7 no 5th"     : [4, 7],
    "min7 no 5th"     : [3, 7],
    "7 no 5th"        : [4, 6],
    "dim7 no 5th"     : [3, 6],
    "minmaj7 no 5th"  : [3, 8],
    // 6th no 5th trichords:
    "maj6 no 5th"     : [4, 5],
    "min6 no 5th"     : [3, 6],
    // Add no 5th trichords:
    "maj add2 no 5th" : [4, 10],
    "maj add4 no 5th" : [4, 1]
};

var fourNoteChords = {
    // 7th chords:
    "maj7"       : [4, 3, 4],   // Major seventh
    "min7"       : [3, 4, 3],   // Minor seventh 
    "7"          : [4, 3, 3],   // Dominant seventh
    "min7b5"     : [3, 3, 4],   // Half-diminished seventh
    "dim7"       : [3, 3, 3],   // Diminished seventh
    "minmaj7"    : [3, 4, 4],   // Minor-major seventh
    "maj7#5"     : [4, 4, 3],   // Augmented-major seventh
    "7b5"        : [4, 2, 4],   // Augmented seventh
    "7#5"        : [4, 4, 2],   // Dominant seventh flat five
    // 6th chords:
    "maj6"       : [4, 3, 2],   // Major sixth
    "min6"       : [3, 4, 2],   // Minor sixth 
    // Add chords:
    "maj add2"   : [4, 3, 7,],  // Major added-second
    "maj add4"   : [4, 3, 10],  // Major added-fourth
    // No 7th chords:
    "min9 no 7th" : [3, 4, 7]    // Minor ninth no seventh
};


// Node exports:
exports.threeNoteChords = threeNoteChords;
exports.fourNoteChords  = fourNoteChords;