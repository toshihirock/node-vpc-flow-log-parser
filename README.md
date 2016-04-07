# vpc-flow-log-parser

A basic parser for VPC Flow Log, strongly inspired by node-clf-parser https://github.com/jfhbrook/node-clf-parser 

## When I use this npm?

+ VPC FLow Log(CloudWatchLogs)->Lambda->ElasticSearch. Example [awslabs/amazon-elasticsearch-lambda-samples](https://github.com/awslabs/amazon-elasticsearch-lambda-samples/blob/master/src/s3_lambda_es.js)
+ Analyze VPC Flow Log

## Install

```
$npm install elb-log-parser
```

## Example

```
$node
> var parse = require('./index');
undefined
> parse('2 11111 eni-901258d8 133.130.120.204 172.31.23.15 123 123 17 3 228 1460005175 1460005449 ACCEPT OK')
{ version: '2',
  account_id: '11111',
  interface_id: 'eni-901258d8',
  srcaddr: '133.130.120.204',
  dstaddr: '172.31.23.15',
  srcport: '123',
  dstport: '123',
  protocol: '17',
  packets: '3',
  byte: '228',
  start: '1460005175',
  end: '1460005449',
  action: 'ACCEPT',
  log_status: 'OK' }
>
```

You get the idea.

## Tests

```
$npm test
```

## License

WTFPL
