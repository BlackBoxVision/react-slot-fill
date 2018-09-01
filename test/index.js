const { expect } = require('chai');

const { getHelloMessage } = require('../src');

describe("Hello World", () => {
    it("Message is a String", done => {
        const msg = getHelloMessage();
        expect(msg).to.be.a("string");
        done();
    });

    it("Message returns Hello World", done => {
        const msg = getHelloMessage();
        expect(msg).to.equal("Hello World");
        done();
    });
});