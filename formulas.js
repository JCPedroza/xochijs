/** @module formulas */
/*jslint node: true */
"use strict";

// ===========================================
//      Equal Temperament 12 semi-tones pool
// ===========================================
var ET12POOL = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

// ===========================================
//                 Intervals
// ===========================================
var INTERVALS = ["unison", "minor second", "major second", "minor third",
                 "major third", "perfect fourth", "tritone", "perfect fifth",
                 "minor sixth", "major sixth", "minor seventh", "major seventh"];

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

// Array indexes: 
// 0: formula
// 1: root offset for no root chords, distance from the lowest note to the root
// 2: Long name

var twoNoteChords = {
    // Indeterminate triad (no 3rd):
    "5"                      : [[7], 0, "Indeterminate triad (power chord)"],
    "b5 no 3rd"              : [[6], 0, "Flat five no third"],
    // No 5th:
    "maj no 5th"             : [[4], 0, "Major no fifth"],
    "min no 5th"             : [[3], 0, "Minor no fifth"],
    "sus4 no 5th"            : [[5], 0, "Suspended fourth no fifth"],
    "sus2 no 5th"            : [[2], 0, "Suspended second no fifth"],
    // No root:
    "maj no root"            : [[3], -4, "Major no root"],
    "min no root"            : [[4], -3, "Minor no root"],
    // No 3rd no 5th
    "maj7 no(3rd, 5th)"      : [[11], 0, "Major seventh no third no fifth"],
    "7 no(3rd, 5th)"         : [[10], 0, "Dominant seventh no third no fifth"]
};

var threeNoteChords = {
    // Triads:
    "maj"             : [[4, 3], 0,  "Major triad"],
    "min"             : [[3, 4], 0,  "Minor triad"],
    "aug"             : [[4, 4], 0,  "Augmented triad"],
    "dim"             : [[3, 3], 0,  "Diminished triad"],
    // Sus trichords:
    "sus4"            : [[5, 2], 0,  "Suspended fourth trichord"],
    "sus2"            : [[2, 5], 0,  "Suspended second trichord"],
    // 7th no 5th trichords:
    "maj7 no 5th"     : [[4, 7], 0,  "Major seventh no fifth"],
    "min7 no 5th"     : [[3, 7], 0,  "Minor seventh no fifth"],
    "7 no 5th"        : [[4, 6], 0,  "Dominant seventh no fifth"],
    "dim7 no 5th"     : [[3, 6], 0,  "Diminished seventh no fifth"],
    "minmaj7 no 5th"  : [[3, 8], 0,  "Minor-major seventh no fifth"],
    // 6th no 5th trichords:
    "maj6 no 5th"     : [[4, 5], 0,  "Major sixth no fifth"],
    "min6 no 5th"     : [[3, 6], 0,  "Minor sixth no fifth"],
    // Add no 5th trichords:   
    "maj add2 no 5th" : [[4, 10], 0, "Major added-second no fifth"],
    "maj add4 no 5th" : [[4, 1], 0,  "Major added-fourth no fifth"],
    // 7th no root chords:
    "maj7 no root"    : [[3, 4], -4, "Major seventh no root"],
    "min7 no root"    : [[4, 3], -3, "Minor seventh no root"],
    "7 no root"       : [[3, 3], -4, "Dominant seventh no root"],
    "min7b5 no root"  : [[3, 4], -3, "Half-diminished seventh no root"],
    "dim7 no root"    : [[3, 3], -3, "Diminished seventh no root"],
    "minmaj7 no root" : [[4, 4], -3, "Minor-major seventh no root"],
    "maj7#5 no root"  : [[4, 3], -4, "Major seventh sharp fifth no root"],
    "7b5 no root"     : [[2, 4], -4, "Dominant seventh flat fifth no root"],
    "7#5 no root"     : [[4, 2], -4, "Dominant seventh sharp fifth no root"],
    "maj7b5 no root"  : [[2, 5], -4, "Major seventh flat fifth"],
    "min7#5 no root"  : [[5, 2], -3, "Minor seventh sharp fifth"]
};

var fourNoteChords = {
    // 7th chords:
    "maj7"          : [[4, 3, 4],  0, "Major seventh"],
    "min7"          : [[3, 4, 3],  0, "Minor seventh"],
    "7"             : [[4, 3, 3],  0, "Dominant seventh"],
    "min7b5"        : [[3, 3, 4],  0, "Half-diminished seventh"],
    "dim7"          : [[3, 3, 3],  0, "Diminished seventh"],
    "minmaj7"       : [[3, 4, 4],  0, "Minor-major seventh"],
    "maj7#5"        : [[4, 4, 3],  0, "Augmented-major seventh"],
    "7b5"           : [[4, 2, 4],  0, "Dominant seventh flat five"],
    "7#5"           : [[4, 4, 2],  0, "Dominant seventh sharp five"],
    "maj7b5"        : [[4, 2, 5],  0, "Major seventh flat fifth"],
    "min7#5"        : [[3, 5, 2],  0, "Minor seventh sharp fifth"],
    "7#9b5 no R"    : [[2, 4, 5], -4, "Dominant seventh sharp ninth flat fifth no root"],
    "7#9b9 no 3, 5" : [[1, 2, 7],  0, "Dominant seventh sharp ninth flat ningth"],
    "maj7#9 no 5"   : [[3, 1, 7],  0, "Major seventh sharp ninth no fifth"],
    "7#11 no 3"     : [[6, 1, 3],  0, "Dominant seventh sharp eleventh no third"],
    // 6th chords:
    "maj6"          : [[4, 3, 2],  0, "Major sixth"],
    "min6"          : [[3, 4, 2],  0, "Minor sixth"],
    // Add chords:
    "maj add2"      : [[4, 3, 7],  0, "Major added-second"],
    "maj add4"      : [[4, 3, 10], 0, "Major added-fourth"],
    // 9th chords:
    "maj9 no 3"       : [[2, 5, 4],  0, "Major ninth no third"],
    "maj9 no 5th"     : [[2, 2, 7],  0, "Major ninth no fifth"],
    "min9 no 5th"     : [[3, 7, 4],  0, "Minor ninth no fifth"],
    "9 no 5th"        : [[4, 6, 4],  0, "Dominant ninth no fifth"],
    "minmaj9 no 5th"  : [[2, 1, 8],  0, "Minor-major ninth no fifth"],
    "6/9 no 5th"      : [[4, 5, 5],  0, "Six Nine no fifth"],
    "maj9#11 no 3, 5" : [[2, 4, 5],  0, "Major ninth sharp eleventh no   : third, fifth"],
    "maj9 no root"    : [[3, 4, 3], -4, "Major ninth no root"],
    "9 sus4 no root"  : [[3, 4, 3], -7, "Dominant ninth suspended fourth no root"],
    "9 no root"       : [[3, 3, 4], -4, "Dominant ninth no root"],
    "min9#11 no R, 7" : [[3, 1, 7], -3, "Minor ninth sharp eleventh no: root, seventh"],
    // 11th chords:
    "maj11 no 3, 5"    : [[2, 3, 6],  0, "Major eleventh no: third, fifth"],
    "min11 no 5, 7"    : [[2, 1, 2],  0, "Minor eleventh no: fifth, seventh"],
    "11b9 no 5, 7"     : [[1, 3, 1],  0, "Dominant eleventh flat ninth no: fifth, seventh"],
    "11 no R, 9"       : [[1, 2, 3], -4, "Dominant eleventh no: root, ninth"],
    "min11 no R, 5"    : [[2, 5, 4], -3, "Minor eleventh no: root, fifth"],
    "min11 no R, 7"    : [[2, 2, 7], -3, "Minor eleventh no: root, seventh"],
    "11#5 no R, 9"     : [[1, 3, 2], -4, "Dominant eleventh sharp fifth no: root, ninth"],
    "minmaj11 no 5, 9" : [[3, 2, 6],  0, "Minor-major eleventh no: fifth, ninth"],
    // 13th chords:
    "min13 no 5, 9, 11"     : [[3, 6, 1],  0, "Minor seventh with sixth no fifth"],
    "13 no 5, 9, 11"        : [[4, 5, 1],  0, "Dominant thirteenth no: 5, 9, 11"],
    "13 no 3, 5, 11"        : [[2, 7, 1],  0, "Dominant thirteenth no: third, fifth, eleventh"],
    "13 no 3, 5, 9"         : [[5, 4, 1],  0, "Dominant thirteenth no: third, fifth, ninth"],
    "maj13 no 3, 5, 11"     : [[2, 7, 2],  0, "Major thirteenth no: third, fifth, eleventh"],
    "13b9 no 3, 5, 11"      : [[1, 8, 1],  0, "Dominant thirteenth flat nine no: third, fifth, eleventh"],
    "13 no 3, 9, 11"        : [[7, 2, 1],  0, "Dominant thirteenth no: third, ninth, eleventh"],
    "13#9b9 no R, 3, 5, 11" : [[1, 3, 2], -9, "Dominant thirteenth no: root, third, fifth, eleventh"]
    

};

var fiveNoteChords = {
    // Ninth chords:
    "min9"         : [[3, 4, 3, 4], 0, "Minor ninth"],
    "9"            : [[4, 3, 3, 4], 0, "Dominant ninth"],
    "maj9"         : [[4, 3, 4, 3], 0, "Major ninth"],
    "6/9"          : [[4, 3, 2, 5], 0, "Six nine"],
    // Ninth sus chords:
    "9 sus4"       : [[5, 2, 3, 4], 0, "Dominant ninth suspended fourth"]

};

// Node exports:
exports.ET12POOL        = ET12POOL;
exports.INTERVALS       = INTERVALS;
exports.twoNoteChords   = twoNoteChords;
exports.threeNoteChords = threeNoteChords;
exports.fourNoteChords  = fourNoteChords;
exports.fiveNoteChords  = fiveNoteChords;


// ===========================================
//           Chord Formulas Notes
// ===========================================

// http://www.standingstones.com/chordname.html <-- systematic chord naming
// http://www.scales-chords.com/showchbykey.php?key=C
// http://music.stackexchange.com/questions/11659/what-determines-a-chords-name/
// https://en.wikipedia.org/wiki/Chord_names_and_symbols_%28jazz_and_pop_music%29#Seventh_chords
// https://en.wikibooks.org/wiki/Music_Theory/Complete_List_of_Chord_Patterns
// http://music.stackexchange.com/questions/3732/what-notes-are-optional-in-jazz-chords
// http://www.smithfowler.org/music/Chord_Formulas.htm

// Ted green's v-system:
// http://www.tedgreene.com/teaching/v_system.asp
// http://www.tedgreene.com/images/lessons/v_system/15_The_Mathematics_of_Four-Note_Chords-and-Beyond.pdf

// To keep in mind:
// 2 would be D a major 2nd up, but in most cases, it's considered a 9th no matter what octave it is in. The chord would still 
// be C9. In jazz chords, 4ths are generally considered 11ths unless there is no 3rd present (like a sus chord). 6ths are generally 
// considered 13ths unless there is no 7th present (like a min6 or Maj6 chord). 2nds are almost always considered 9ths. Sus2 would 
// be an exception (no 3rd present) but it's rare in jazz.

// http://tedgreene.com/images/lessons/v_system/14_The_43_Four-Note_Qualities.pdf 
// Synonims: 
// Xm7/6         = Xm13 no 5, 9, 11 
// X7/6 no 3     = X13 no 3, 9, 11 
// X7/11 no R    = X11 no R, 9
// Xm/9/11 no R  = Xm11 no R, 7
// Xm/9/11       = Xm11 no 5, 7  < as is in paper, should it be Xm/9/11 no 5th?
// Xmaj9sus no 5 = Xmaj11 no 3, 5
// = D11+  = D11#5 ???

// Homonyms included:
// 1: 1, 2
// 2: 1, 2, 3
// 3: 1, 2, 3
// 4: 1, 2, 3
// 5: 1, 2, 3, 4
// 6: none
// 7: 1, 2, 3, 4
// 8: 1, 2, 3
// 9: 1, 2, 3, 5

// Reference tools:
// http://www.scales-chords.com/chordid.php
// http://www.gootar.com/piano/
// Logic Pro