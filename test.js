var tap = require('tap');

var parse = require('./index.js')

tap.test('accept traffic', function (t) {
  var parsed = parse(
    '2 1111 eni-901258d8 133.130.120.204 172.31.23.15 123 123 17 3 228 1460005175 1460005449 ACCEPT OK'
  );
  t.equal(parsed.version, '2', 'we have version');
  t.equal(parsed.account_id, '1111', 'we have account-id');
  t.equal(parsed.interface_id, 'eni-901258d8', 'we have interface-id');
  t.equal(parsed.srcaddr, '133.130.120.204', 'we have srcaddr');
  t.equal(parsed.dstaddr, '172.31.23.15', 'we have dstaddr');
  t.equal(parsed.srcport, '123', 'we have srcport');
  t.equal(parsed.dstport, '123', 'we have dstport');
  t.equal(parsed.protocol, '17', 'we have protocol');
  t.equal(parsed.packets, '3', 'we have packets');
  t.equal(parsed.byte, '228', 'we have byte');
  t.equal(parsed.start, '1460005175', 'we have start');
  t.equal(parsed.end, '1460005449', 'we have end');
  t.equal(parsed.action, 'ACCEPT', 'we have action');
  t.equal(parsed.log_status, 'OK', 'we have log_status');
  t.end();
});