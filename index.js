module.exports = (function() {

var plastiq = require('plastiq');

var stylesheet = (function(){ return [
  ".inspect { border: none }",
  ".inspect-array { list-style-type: none; margin-bottom: 3px; padding: 0; ",
  "    border: 1px solid gray; border-bottom: none;",
  "     }",
  ".inspect-array-value { border-bottom: 1px solid gray; padding: 5px; }",
  ".inspect-object { margin: 0px; border-collapse: collapse }",
  ".inspect-object td { border: 1px solid gray; padding: 5px; ",
  "   vertical-align: top }",
  ".inspect-date { color: purple; } ",
  ".inspect-string { color: green; } ",
  ".inspect-number { color: darkblue; }",
  ".inspect-undefined { color: darkblue; }",
  ".inspect-error { color: red; }"
]; })();

var h = (function(plastiq){ return plastiq.html })(plastiq);

var inspect = (function(h,stylesheet){ var inspectObject = function(object) {
  var type = typeof(object);
  var result = '';
  if (type == 'undefined') {
    return h('.inspect-undefined', 'undefined');
  } else if (object.constructor == this.Date) {
    return h('.inspect-date', object.toString());
  }  else if (object.constructor == this.Error) {
    return h('.inspect-error', object.toString());
  } else if (type == 'object') {
    if (object instanceof this.Array) {
      result = h('ul.inspect-array',
        object.map(function(n) {
          return h('li.inspect-array-value', inspectObject(n))
        })
      );
    }
    else {
      result = h('table.inspect-object', Object.keys(object).map(function(k) {
        return h('tr.inspect-object',
          h('td.inspect-object-key', k),
          h('td.inspect-object-value', inspectObject(object[k]))
        );
      }))
    }
  } else if (type == 'number') {
    return h('.inspect-number', Number(object));
  } else if (type == 'string') {
    return h('.inspect-string', object.toString());
  } else {
    return h('.inspect-unknown', object.toString());
  }
  return h('.inspect', result);
}

return function(object) {
  return h('.inspect',
    h('style', { key: 'inspect-style', attributes: { type: 'text/css'} },
      stylesheet
    ),
    inspectObject(object)
  );
} })(h,stylesheet);

return inspect;

})();
