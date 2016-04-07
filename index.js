module.exports = function (line) {
  var parsed = {};
  //
  // Trailing newline? NOTHX
  //
  if (line.match(/\n$/)) {
    line = line.slice(0, line.length - 1);
  }

  [
    { 'version'            : ' '  },
    { 'account_id'         : ' '  },
    { 'interface_id'       : ' '  },
    { 'srcaddr'            : ' '  },
    { 'dstaddr'            : ' '  },
    { 'srcport'            : ' '  },
    { 'dstport'            : ' '  },
    { 'protocol'           : ' '  },
    { 'packets'            : ' '  },
    { 'byte'               : ' '  },
    { 'start'              : ' '  },
    { 'end'                : ' '  },
    { 'action'             : ' '  },
    { 'log_status'         : ' '  }
  ].some(function (t) {
    var label = Object.keys(t)[0];
    delimiter = t[label]
    var m = line.match(delimiter);
    if (m === null) {
      //
      // No match. Try to pick off the last element.
      //
      m = line.match(delimiter.slice(0, 1));

      if (m === null) {
        field = line;
      }
      else {
        field = line.substr(0, m.index);
      }

      parsed[label] = field;

      return true;
    }
    field = line.substr(0, m.index);
    line = line.substr(m.index + delimiter.length);
    parsed[label] = field;
  });

  return parsed;
};
