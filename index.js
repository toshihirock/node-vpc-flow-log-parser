var moment = require('moment');

module.exports = function (line) {
  var protocols = [
    'HOPOPT',
    'ICMP',
    'IGMP',
    'GGP',
    'IPv4',
    'ST',
    'TCP',
    'CBT',
    'EGP',
    'IGP',
    'BBN-RCC-MON',
    'NVP-II',
    'PUP',
    'ARGUS',
    'EMCON',
    'XNET',
    'CHAOS',
    'UDP',
    'MUX',
    'DCN-MEAS',
    'HMP',
    'PRM',
    'XNS-IDP',
    'TRUNK-1',
    'TRUNK-2',
    'LEAF-1',
    'LEAF-2',
    'RDP',
    'IRTP',
    'ISO-TP4',
    'NETBLT',
    'MFE-NSP',
    'MERIT-INP',
    'DCCP',
    '3PC',
    'IDPR',
    'XTP',
    'DDP',
    'IDPR-CMTP',
    'TP++',
    'IL',
    'IPv6',
    'SDRP',
    'IPv6-Route',
    'IPv6-Frag',
    'IDRP',
    'RSVP',
    'GRE',
    'DSR',
    'BNA',
    'ESP',
    'AH',
    'I-NLSP',
    'SWIPE',
    'NARP',
    'MOBILE',
    'TLSP',
    'SKIP',
    'IPv6-ICMP',
    'IPv6-NoNxt',
    'IPv6-Opts',
    '',
    'CFTP',
    '',
    'SAT-EXPAK',
    'KRYPTOLAN',
    'RVD',
    'IPPC',
    '',
    'SAT-MON',
    'VISA',
    'IPCV',
    'CPNX',
    'CPHB',
    'WSN',
    'PVP',
    'BR-SAT-MON',
    'SUN-ND',
    'WB-MON',
    'WB-EXPAK',
    'ISO-IP',
    'VMTP',
    'SECURE-VMTP',
    'VINES',
    'TTP',
    'IPTM',
    'NSFNET-IGP',
    'DGP',
    'TCF',
    'EIGRP',
    'OSPFIGP',
    'Sprite-RPC',
    'LARP',
    'MTP',
    'AX.25',
    'IPIP',
    'MICP',
    'SCC-SP',
    'ETHERIP',
    'ENCAP',
    '',
    'GMTP',
    'IFMP',
    'PNNI',
    'PIM',
    'ARIS',
    'SCPS',
    'QNX',
    'A/N',
    'IPComp',
    'SNP',
    'Compaq-Peer',
    'IPX-in-IP',
    'VRRP',
    'PGM',
    '',
    'L2TP',
    'DDX',
    'IATP',
    'STP',
    'SRP',
    'UTI',
    'SMP',
    'SM',
    'PTP',
    'ISIS',
    'FIRE',
    'CRTP',
    'CRUDP',
    'SSCOPMCE',
    'IPLT',
    'SPS',
    'PIPE',
    'SCTP',
    'FC',
    'RSVP-E2E-IGNORE',
    'Mobility',
    'UDPLite',
    'MPLS-in-IP',
    'manet',
    'HIP',
    'Shim6',
    'WESP',
    'ROHC',
  ];

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

  // set protocol name
  if(parsed['protocol'] < 143) {
    parsed['protocol_name'] = protocols[parsed['protocol']];
  }

  // set date 
  var mStart = moment.unix(Number(parsed['start']));
  var mEnd= moment.unix(Number(parsed['end']));
  parsed['start_utc'] = mStart.utc().format('YYYY-MM-DD HH:mm:ss');
  parsed['end_utc'] = mEnd.utc().format('YYYY-MM-DD HH:mm:ss');

  return parsed;
};
