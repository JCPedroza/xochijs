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
//              Chord Formulas
// ===========================================

// Chord formulas:
var triadFormulas = {
    "maj":  [4, 3],
    "min":  [3, 4],
    "aug":  [4, 4],
    "dim":  [3, 3],
    "sus4": [5, 2],
    "sus2": [2, 5]
};

exports.triadFormulas = triadFormulas;