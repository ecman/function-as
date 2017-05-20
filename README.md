 # function-as

Pass functions as if they had, one or more, constant args

# Usage

```js
function run_callback(callback) {
  // run callback with five strings and no error (i.e. null)
  callback(null, "one", "two", 'three', 'four', 'five');
}

// Will be passed as callback function
function five_strings(err, one, two, three, four, five) {
  console.log('result:', err, one, two, three, four, five);
  console.log("\n");
}

console.log( "A normal call" );
run_callback(five_strings);

console.log( "Set first params as '0'" );
run_callback(five_strings.asfirst('0'));

console.log( "Set first params as [caller specified] and '1'" );
run_callback(five_strings.asfirst(undefined, '1'));

console.log( "Set last params as '5'" );
run_callback(five_strings.aslast('5'));

console.log( "Set last params as '4' and [caller specified]" );
run_callback(five_strings.aslast('4', undefined));

console.log( "Set first params as '0' and last as '5'" );
run_callback(five_strings.as(['0'], ['5']));

console.log( "Set first params as [caller specified],'1', '2'\n" +
             "and last as '4', '5'" );
run_callback(five_strings.as([undefined, '1', "2"], ["4", '5']));

console.log( "Set first params as 'ZERO' and last as 'FIVE'\n" +
             "by chaining calls to asfirst() and aslast()" );
run_callback(five_strings.asfirst('ZERO').aslast('FIVE'));
```
