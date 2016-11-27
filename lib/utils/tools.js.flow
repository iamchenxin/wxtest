// @flow
const util = require('util');

function JSONstring(ob: Object): string {
  return JSON.stringify(ob, null, 2);
}

function log() {
  console.log.apply(null, arguments);
}

function warn() {
  console.warn.apply(null, arguments);
}

function format(v: mixed): string {
  return util.inspect(v, {depth: null});
}

function formatProp(v: mixed): string {
  if ( typeof v === 'object' && v != null) {
    const ob = v;
    const str = Object.keys(ob).map( key => {
      return `${key}:<br/>\n ${util.inspect(ob[key], {depth: null})}\n\n\n`;
    }).join('<br/>\n');
    return str;
  } else {
    return format(v);
  }
}

module.exports = {
  JSONstring,
  format,
  formatProp,
};
