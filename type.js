/** @module typeCheck */
/* jslint node: true */
"use strict";

// ===========================================
//                checkString 
// ===========================================
var checkString = function (arg) {
    if (typeof arg !== "string") {
        throw new TypeError("argument must be of type string");
    }
};

// ===========================================
//             checkStringArray 
// ===========================================
var checkStringArray = function (arg) {
    if (!(arg instanceof Array) || typeof arg[0] !== "string"){
        throw new TypeError("argument must be an array of string");
    }
};


// node exports
exports.checkString      = checkString;
exports.checkStringArray = checkStringArray;
