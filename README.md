# public ipv4

**ZERO dependencies**

this module offers 2 functions to deal with IPv4 addresses:
- `create`, creates a random public IPv4 address
- `verify`, verifies a string to be a valid public IPv4 address

The list of non-public IPv4 addresses has been taken from [RFC5735](https://tools.ietf.org/html/rfc5735).

## Install

To use in a node application:
```bash
npm install public-ipv4
```

To use as a cli tool
```bash
npm install -g public-ipv4
```

## Usage

In a node application:
```javascript
const publicIPv4 = require("public-ipv4")

const anIp = publicIPv4.create()
// anIp will contain a random public IPv4 as a String (example: "203.16.43.67")

const check1 = publicIPv4.verify("300.0.0.1")
// check1 === false (300 is out of range)

const check2 = publicIPv4.verify("192.168.24.34")
// check2 === false (it's a private IPv4 address)

const check3 = publicIPv4.verify("155.53.65.125")
// check3 === true (it's a valid public IPv4 address)
```

As a cli tool:
```bash
public-ipv4 --help
public-ipv4 -h
# outputs help about the command

public-ipv4
# outputs a random public IPv4 address

public-ipv4 --verify 300.0.0.1
# outputs 'invalid' and return code is 1 (so you can use it in pipes)

public-ipv4 --verify 192.168.24.34
# outputs 'invalid' and return code is 1 (so you can use it in pipes)

public-ipv4 --verify 155.53.65.125
# outputs 'valid: 155.53.65.125' and return code 0 (so you can use it in pipes)
```

for a bash example see [examples_bash](examples_bash/) folder

## License

MIT
