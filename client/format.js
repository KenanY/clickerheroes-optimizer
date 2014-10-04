var UNITS = 'KMBTqQsSONdUD!@#$%^&*';

function format(n) {
  var original = n;
  var p = 0;
  while (n >= 100000) {
    n /= 1000;
    p++;
  }

  var str = Math.floor(n).toLocaleString();

  if (p > UNITS.length) {
    return original.toExponential(3).replace('+', '');
  }

  if (p) {
    str += UNITS[p - 1];
  }

  return str;
}

module.exports = format;