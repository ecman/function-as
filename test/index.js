require('../');
const assert = require('assert');

function run_callback(callback) {
  // run callback with five strings and no error (i.e. null)
  return callback(null, "one", "two", 'three', 'four', 'five');
}

// Will be passed as callback function
function five_strings(err, one, two, three, four, five) {
  return [err, one, two, three, four, five];
}

assert.deepStrictEqual(
  [null, 'one', 'two', 'three', 'four', 'five'],
  run_callback(five_strings.asfirst()),
  "An empty call should leave arguments as is"
);
assert.deepStrictEqual(
  [null, 'one', 'two', 'three', 'four', 'five'],
  run_callback(five_strings.aslast()),
  "An empty call should leave arguments as is"
);
assert.deepStrictEqual(
  [null, 'one', 'two', 'three', 'four', 'five'],
  run_callback(five_strings.as()),
  "An empty call should leave arguments as is"
);
console.log('Empty asfirst() aslast() as() calls OK');

assert.deepStrictEqual(
  ['0', 'one', 'two', 'three', 'four', 'five'],
  run_callback(five_strings.asfirst('0')),
  "asfirst('0') should have set 'null' to '0'"
);
console.log("asfirst('0') call OK");

assert.deepStrictEqual(
  [null, '1', 'two', 'three', 'four', 'five'],
  run_callback(five_strings.asfirst(undefined, '1')),
  "asfirst(undefined, '1') should skip the 1st" 
  + " and set the 2nd param to '1'"
);
console.log("asfirst(undefined,'1') call OK"); 

assert.deepStrictEqual(
  [null, 'one', 'two', 'three', 'four', '5'],
  run_callback(five_strings.aslast('5')),
  "aslast('5') should set the last param to '5'"
);
console.log("aslast('5') call OK");

assert.deepStrictEqual(
  [null, 'one', 'two', 'three', '4', 'five'],
  run_callback(five_strings.aslast('4', undefined)),
  "aslast('4', undefined) should set the 2nd to"
  + " last parameter to '4' and skipped the very last"
);
console.log("aslast('4', undefined) call OK");

assert.deepStrictEqual(
  ['0', 'one', 'two', 'three', 'four', '5'],
  run_callback(five_strings.as(['0'], ['5'])),
  "as(['0'], ['5']) should set the first param" +
  " as '0' and the last as '5'"
);
console.log( "as(['0'], ['5']) call OK");

assert.deepStrictEqual(
  [null, '1', '2', 'three', '4', '5'],
  run_callback(five_strings.as([undefined, '1', "2"], ["4", '5'])),
  "as([undefined, '1', '2'], ['4', '5']) should skip the 1st and\n"
  + "set the 2nd and 3rd params to '1' and '2'.\n"
  + "Then set the last params to '4' and '5'"
);
console.log("as([undefined, '1', '2'], ['4', '5']) call OK");
  

assert.deepStrictEqual(
  ['ZERO', 'one', 'two', 'three', 'four', 'FIVE'],
  run_callback(five_strings.asfirst('ZERO').aslast('FIVE')),
  "asfirst('ZERO').asfirst('FIVE') should set the\n"
  + " first param to 'ZERO' and the last to 'FIVE'"
);
console.log("asfirst('ZERO').asfirst('FIVE') call OK");
