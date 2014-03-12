//function get_opt(keyname, obj, default_val) {
//	if(keyname in obj) {
//		return obj[keyname];
//	} else {
//		return default_val;
//	}
//}

//function get_vax(obj, variable, spec, default_val, strict) {
//
//}


function assert(loc, condition, msg) {
	msg = msg || '';

    if (!condition) {
        alert('Assertion Error in ' + loc + '. ' + msg);
    }
}


function validate(loc, variable, spec, default_val, suppress_validation) {

	// By default, invalid input raises an error, but this can be suppressed
	suppress_validation == suppress_validation || false;

	// be strict by default
	strict = (typeof(strict)=='undefined')? true: strict;

	// just return the value if its the expected type
	if(typeof(variable) == spec) {
		return variable;

	// if variable is undefined, and a default is specified, return default
	} else if(typeof(default_val) !== 'undefined' 
		&& typeof(variable) == 'undefined') {
			return default_val;

	// otherwise, if strict and not suppressed, 'raise' an error
	} else if(strict && !suppress_validation) {
		alert('Error');

	// But if suppressed or not strict, just return the default value
	} else {
		return default_val;
	}
}

/*
    -9007199254740990 to 9007199254740990
*/

function isInt(n) {
    return +n === n && !(n % 1);
}

/*
    -128 to 127
*/

function isInt8(n) {
    return +n === n && !(n % 1) && n < 0x80 && n >= -0x80;
}

/*
    -32768 to 32767
*/

function isInt16(n) {
    return +n === n && !(n % 1) && n < 0x8000 && n >= -0x8000;
}

/*
    -2147483648 to 2147483647
*/

function isInt32(n) {
    return +n === n && !(n % 1) && n < 0x80000000 && n >= -0x80000000;
}

/*
    0 to 9007199254740990
*/

function isUint(n) {
    return +n === n && !(n % 1) && n >= 0;
}

/*
    0 to 255
*/

function isUint8(n) {
    return +n === n && !(n % 1) && n < 0x100 && n >= 0;
}

/*
    0 to 65535
*/

function isUint16(n) {
    return +n === n && !(n % 1) && n < 0x10000 && n >= 0;
}

/*
    0 to 4294967295
*/

function isUint32(n) {
    return +n === n && !(n % 1) && n < 0x100000000 && n >= 0;
}

/*
    Any number including Infinity and -Infinity but not NaN
*/

function isFloat(n) {
    return +n === n;
}

/*
    Any number from -3.4028234e+38 to 3.4028234e+38 (Single-precision floating-point format)
*/

function isFloat32(n) {
    return +n === n && Math.abs(n) <= 3.4028234e+38;
}

/*
    Any number excluding Infinity and -Infinity and NaN (Number.MAX_VALUE = 1.7976931348623157e+308)
*/

function isFloat64(n) {
    return +n === n && Math.abs(n) <= 1.7976931348623157e+308;
}
