#!/usr/bin/env node
"use strict"

const LOW = 0
const HIGH = 255

//
// Validators
//

const isIp = (val) => {
    // val should be a string
    if (!val || typeof val !== "string") {
        return false
    }

    // check that val consits of 4 numbers (between 1 and 3 chars) separated by dots (so 3 in total)
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(val)) {
        return false
    }

    // check for numbers out of range (e.g. 300.34.52.155)
    for (let part of val.split(".")) {

        // catch start with zero (e.g. 145.00.1.2)
        if (part.charAt(0) === "0" && part.length > 1) {
            return false
        }

        part = parseInt(part)

        if (part < LOW || part > HIGH) {
            return false
        }
    }

    return true
}

const isPrivate = (ip) => {
    if (/^10\./.test(ip) ||
        /^172\.16\./.test(ip) ||
        /^192\.168\./.test(ip)) {

        return true
    }
    return false
}

const isReserved = (ip) => {
    if (/^0\./.test(ip) ||
        /^100\.64\./.test(ip) ||
        /^127\./.test(ip) ||
        /^169\.254\./.test(ip) ||
        /^192\.0\.[0,2]\./.test(ip) ||
        /^192\.88\.99\./.test(ip) ||
        /^198\.1[8-9]\./.test(ip) ||
        /^198\.51\.100\./.test(ip) ||
        /^203\.0\.113\./.test(ip) ||
        /^22[4-9]|^23[0-9]|^24[0-9]|^25[0-5]/.test(ip)) {

        return true
    }
    return false
}

const isPublic = (val) => {

    if (!isIp(val) ||
        isPrivate(val) ||
        isReserved(val)) {
        return false
    }
    return true
}

//
// Creators
//

const getRandomPart = () => {
    return Math.floor(Math.random() * (HIGH - LOW + 1) + LOW);
}

const createPublic = () => {
    const ip = `${getRandomPart()}.${getRandomPart()}.${getRandomPart()}.${getRandomPart()}`

    if (!isPublic(ip)) {
        return createPublic()
    }

    return ip
}

const cli_info =
`
    NAME
        public-ipv4 -- creates or verifies a public IPv4 address

    USAGE
        public-ipv4                         outputs a random public IPv4 address
        public-ipv4 --verify <ip address>   verifies that the given ip address is a
                                            public IPv4 address

    public-ipv4 -h                          outputs help (your looking at it)
    piblic-ipv4 --help                      outputs help (your looking at it)
`

//
// Exports/CLI execution
//

if (require.main === module) {
    // used as a cli tool

    const args = process.argv.slice(2)

    if (args[0]) {

        // check for help command
        if (["--help", "-h"].indexOf(args[0]) !== -1) {
            console.log(cli_info)
            process.exit(0)
        }

        if (args.length === 2 && args[0] === "--verify") {
            // output a string indictaing valid or invalid
            // and exit the process with the correct code( 0=valid, 1=notvalid)
            // so the command can be used in pipes:
            // e.g. public-ipv4 verify 88.12.34.134 && ping
            if (isPublic(args[1])) {
                console.log(`valid: ${args[1]}`)
                process.exit(0)
            } else {
                console.log("invalid")
                process.exit(1)
            }
        }
    } else {
        console.log(createPublic())
        process.exit(0)
    }

    // didn't match any know command, so output help
    console.log(cli_info)
    process.exit(0)
} else {
    // module is required in a node applicatio
    exports.verify = isPublic
    exports.create = createPublic
}
