var processing     = require("../processing"),
    equals         = processing.arraysEqual;  // checks equality for arrays

var Tester = function (initErrors) {
    this.numberOfErrors = initErrors || 0;
};

/** Assert equals for arrays */
Tester.prototype.aea = function(a, b){
    if (!(a instanceof Array) || !(b instanceof Array)){
        throw new TypeError("arguments must be of type Array");
    }
    try{
        console.assert(equals(a, b));
    }
    catch(Error){
        this.numberOfErrors += 1;
        console.log();
        console.log(Error.name);               // name of the error
        console.log(a);                        // value a
        console.log(b);                        // value b
        console.log(Error.stack.split("\n"));  // line number of the caller
        console.log();
    }
};

/** Assert equals. */
Tester.prototype.ae = function(a, b){
    try{
        console.assert(a === b);
    }
    catch(Error){
        this.numberOfErrors++;
        console.log();
        console.log(Error.name);               // name of the error
        console.log(a);                        // value a
        console.log(b);                        // value b
        console.log(Error.stack.split("\n"));  // line number of the caller
        console.log();
    }
    
};

/** Assert difference. */
Tester.prototype.adiff = function(a, b){
    try{
        console.assert(a !== b);
    }
    catch(Error){
        this.numberOfErrors++;
        console.log();
        console.log(Error.name);               // name of the error
        console.log(a);                        // value a
        console.log(b);                        // value b
        console.log(Error.stack.split("\n"));  // line number of the caller
        console.log();
    }
    
};


// Exports:
exports.Tester = Tester;