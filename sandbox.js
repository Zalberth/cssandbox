var parse = require('css-parse'),
    fs = require('fs'),
    argv = require('optimist').argv,
    input = argv._,
    sanboxClass = argv.class;

var css = fs.readFileSync('../style/dist/style.css', 'utf8'),
    com = parse(css);

function temperSelector(selector) {
  if (selector.indexOf('@') == 0) {
    return selector;
  } else if (selector == 'html') {
    return  'html.' + sanboxClass;
  } else {
    return '.' + sanboxClass + ' ' + selector;
  }
}

function serialize(com) {
  var serialization = [];

  if (com.type == 'stylesheet') {
    com.stylesheet.rules.forEach(function (rule) {
      serialization.push(serialize(rule));
    });
  } else if (com.type == 'rule') {
    serialization.push(com.selectors.map(temperSelector).join(', ') + ' {');
    com.declarations.forEach(function (declaration) {
      serialization.push(serialize(declaration));
    });
    serialization.push('}');
  } else if (com.type == 'declaration') {
    serialization.push(com.property + ': ' + com.value + ';');
  } else if (com.type == 'comment') {
    return '';
  } else if (com.type == 'media') {
    serialization.push('@media ' + com.media + ' {');
    com.rules.forEach(function (rule) {
      serialization.push(serialize(rule));
    });
    serialization.push('}');
  } else if (com.type == 'page') {
    serialization.push('@page ' + com.selectors.join(', ') + ' {');
    com.declarations.forEach(function (declaration) {
      serialization.push(serialize(declaration));
    });
    serialization.push('}');
  } else if (com.type == 'keyframes') {
    serialization.push('@' + com.vendor + 'keyframes ' + com.name + ' {');
    com.keyframes.forEach(function (keyframe) {
      serialization.push(serialize(keyframe));
    });
    serialization.push('}');
  } else if (com.type == 'keyframe') {
    serialization.push(com.values.join(', ') + ' {');
    com.declarations.forEach(function (declaration) {
      serialization.push(serialize(declaration));
    });
    serialization.push('}');
  } else {
    throw JSON.stringify(com);
  }

  return serialization.join('');
}

console.log(serialize(com));
