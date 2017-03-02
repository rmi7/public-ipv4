"use strict"

const chai = require("chai")
const expect = chai.expect

const publicIPv4 = require("./")

const NONPUBLIC_IPv4_ADDRESSES = [
    "0.0.0.0",
    "0.0.0.255",
    "10.0.0.0",
    "10.0.0.1",
    "10.255.0.0",
    "100.64.0.0",
    "100.64.0.255",
    "169.254.0.0",
    "169.254.0.255",
    "172.16.0.0",
    "172.16.0.255",
    "192.0.0.0",
    "192.0.0.255",
    "192.0.2.0",
    "192.0.2.255",
    "192.88.99.0",
    "192.88.99.255",
    "192.168.0.0",
    "192.168.255.255",
    "198.18.0.0",
    "198.18.255.255",
    "198.19.0.0",
    "198.19.255.255",
    "203.0.113.0",
    "203.0.113.255",
    "224.0.0.0",
    "224.255.255.255",
    "224.0.0.0",
    "224.255.255.255",
    "225.0.0.0",
    "225.255.255.255",
    "226.0.0.0",
    "226.255.255.255",
    "227.0.0.0",
    "227.255.255.255",
    "228.0.0.0",
    "228.255.255.255",
    "229.0.0.0",
    "229.255.255.255",
    "230.0.0.0",
    "230.255.255.255",
    "231.0.0.0",
    "231.255.255.255",
    "232.0.0.0",
    "232.255.255.255",
    "233.0.0.0",
    "233.255.255.255",
    "234.0.0.0",
    "234.255.255.255",
    "235.0.0.0",
    "235.255.255.255",
    "236.0.0.0",
    "236.255.255.255",
    "237.0.0.0",
    "237.255.255.255",
    "238.0.0.0",
    "238.255.255.255",
    "239.0.0.0",
    "239.255.255.255",
    "240.0.0.0",
    "240.255.255.255",
    "241.0.0.0",
    "241.255.255.255",
    "242.0.0.0",
    "242.255.255.255",
    "243.0.0.0",
    "243.255.255.255",
    "244.0.0.0",
    "244.255.255.255",
    "245.0.0.0",
    "245.255.255.255",
    "246.0.0.0",
    "246.255.255.255",
    "247.0.0.0",
    "247.255.255.255",
    "248.0.0.0",
    "248.255.255.255",
    "249.0.0.0",
    "249.255.255.255",
    "250.0.0.0",
    "250.255.255.255",
    "251.0.0.0",
    "251.255.255.255",
    "252.0.0.0",
    "252.255.255.255",
    "253.0.0.0",
    "253.255.255.255",
    "254.0.0.0",
    "254.255.255.255",
    "255.0.0.0",
    "255.255.255.255"
]

const INVALID_IPv4_ADDRESSES = [
    "88",
    "88.",
    ".88",
    ".88.",
    "88.45",
    "88.45.",
    ".88.45",
    ".88.45.",
    "88.45.66",
    "88.45.66.",
    ".88.45.66",
    ".88.45.66.",
    "88.45.66.207.",
    ".88.45.66.207",
    ".88.45.66.207.",
    "x300.12.12.45",
    "300.12.12.45x",
    "x300.12.12.45x",
    "300.12.12.45",
    "154.00.1.13"
]

const NOT_A_STRING = [
    "",
    "a string",
    0,
    7,
    false,
    true,
    undefined,
    null,
    Infinity,
    NaN,
    [],
    ["a"],
    {},
    {"a":1},
    function(){}
]

describe("public-ipv4", () => {
    NONPUBLIC_IPv4_ADDRESSES.forEach((invalid_ip) => {
        it(`fails for non-public ipv4 address: ${invalid_ip}`, () => {
            expect(publicIPv4.verify(invalid_ip)).to.equal(false)
        })
    })

    INVALID_IPv4_ADDRESSES.forEach((invalid_ip) => {
        it(`fails for invalid ipv4 addresses: ${invalid_ip}`, () => {
            expect(publicIPv4.verify(invalid_ip)).to.equal(false)
        })
    })

    NOT_A_STRING.forEach((val) => {
        it(`fails for things that are not a valid String: ${val}`, () => {
            expect(publicIPv4.verify(val)).to.equal(false)
        })
    })
})
