/*jslint node: true */
/** @module in */
"use strict";

// ===========================================
//            checkNoteNameInPool
// ===========================================
var checkNoteNameInPool = function (arg, pool) {
    if (pool.indexOf(arg) === -1) {
        throw new Error("note name " + arg + " not found in pool " + pool);
    }
};

// ===========================================
//          checkNoteNameGroupInPool
// ===========================================
var checkNoteNameGroupInPool = function (args, pool) {
    var index,
        length = args.length;
    for (index = 0; index < length; index += 1) {
        checkNoteNameInPool(args[index], pool);
    }
};

// Exports:
exports.checkNoteNameInPool      = checkNoteNameInPool;
exports.checkNoteNameGroupInPool = checkNoteNameGroupInPool;