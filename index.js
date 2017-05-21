Function.prototype.asfirst = function (...dargs) {
  return function (...args) {
    fillUndefs(dargs, args, false);
    return this(...dargs, 
      ...args.splice(dargs.length));
  }.bind(this);
};

Function.prototype.aslast = function (...dargs) {
  return function (...args) {
    fillUndefs(dargs, args, true);
    var dlen = dargs.length;
    return this(...(args.splice(
      args.length - dlen, dlen) 
      && args), ...dargs);
  }.bind(this);
};

Function.prototype.as = function (fargs, largs) {
  fargs = fargs || [];
  largs = largs || [];
  return this.asfirst(...fargs).aslast(...largs);
};

function fillUndefs(dargs, args, last) {
  let undef = dargs.indexOf(undefined);
  let aindex;
  while (undef >= 0) {
    if (undef < args.length) {
      aindex = last ? args.length - undef : undef;
      dargs[undef] = args[aindex];
      undef = dargs.indexOf(undefined);
    } else break;
  }
}

module.exports = true;
