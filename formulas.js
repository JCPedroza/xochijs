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
// http://www.scales-chords.com/showchbykey.php?key=C
// http://music.stackexchange.com/questions/11659/what-determines-a-chords-name/
// https://en.wikipedia.org/wiki/Chord_names_and_symbols_%28jazz_and_pop_music%29#Seventh_chords
// https://en.wikibooks.org/wiki/Music_Theory/Complete_List_of_Chord_Patterns
// http://music.stackexchange.com/questions/3732/what-notes-are-optional-in-jazz-chords
// http://www.smithfowler.org/music/Chord_Formulas.htm

// Array indexes: 
// 0: formula
// 1: root offset (for no root chords)

var twoNoteChords = {
    // No 5th trichords:
    "maj no 5th"             : [[4], 0],   // Major triad no 5th
    "min no 5th"             : [[3], 0]    // Minor triad no 5th
};

var threeNoteChords = {
    // Triads:
    "maj"             : [[4, 3], 0],   // Major triad
    "min"             : [[3, 4], 0],   // Minor triad
    "aug"             : [[4, 4], 0],   // Augmented triad
    "dim"             : [[3, 3], 0],   // Diminished triad
    // Sus trichords:
    "sus4"            : [[5, 2], 0],   // Suspended fourth trichord
    "sus2"            : [[2, 5], 0],   // Suspended second trichord
    // 7th no 5th trichords:
    "maj7 no 5th"     : [[4, 7], 0],   // Major seventh no fifth
    "min7 no 5th"     : [[3, 7], 0],   // Minor seventh no fifth
    "7 no 5th"        : [[4, 6], 0],   // Dominant seventh no fifth
    "dim7 no 5th"     : [[3, 6], 0],   // Diminished seventh no fifth
    "minmaj7 no 5th"  : [[3, 8], 0],   // Minor-major seventh no fifth
    // 6th no 5th trichords:
    "maj6 no 5th"     : [[4, 5], 0],   // Major sixth no fifth
    "min6 no 5th"     : [[3, 6], 0],   // Minor sixth no fifth
    // Add no 5th trichords:   
    "maj add2 no 5th" : [[4, 10], 0],  // Major added-second no fifth
    "maj add4 no 5th" : [[4, 1], 0]    // Major added-fourth no fifth
};

var fourNoteChords = {
    // 7th chords:
    "maj7"        : [[4, 3, 4], 0],   // Major seventh
    "min7"        : [[3, 4, 3], 0],   // Minor seventh 
    "7"           : [[4, 3, 3], 0],   // Dominant seventh
    "min7b5"      : [[3, 3, 4], 0],   // Half-diminished seventh
    "dim7"        : [[3, 3, 3], 0],   // Diminished seventh
    "minmaj7"     : [[3, 4, 4], 0],   // Minor-major seventh
    "maj7#5"      : [[4, 4, 3], 0],   // Augmented-major seventh
    "7b5"         : [[4, 2, 4], 0],   // Dominant seventh flat five
    "7#5"         : [[4, 4, 2], 0],   // Dominant seventh sharp five
    // 6th chords:
    "maj6"        : [[4, 3, 2], 0],   // Major sixth
    "min6"        : [[3, 4, 2], 0],   // Minor sixth 
    // Add chords:
    "maj add2"    : [[4, 3, 7,], 0],  // Major added-second
    "maj add4"    : [[4, 3, 10], 0],  // Major added-fourth
    // No 5th chords:
    "maj9 no 5th" : [[4, 7, 3], 0],   // Major ninth no fifth
    "9 no 5th"    : [[4, 6, 4], 0],   // Dominant ninth no fifth
    "6/9 no 5th"  : [[4, 5, 5], 0]    // Six Nine no fifth
};

var fiveNoteChords = {
    "6/9"          : [[4, 3, 2, 5]]  // Six nine
};

// Node exports:
exports.twoNoteChords   = twoNoteChords;
exports.threeNoteChords = threeNoteChords;
exports.fourNoteChords  = fourNoteChords;
exports.fiveNoteChords  = fiveNoteChords;