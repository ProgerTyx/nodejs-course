const { Transform } = require('stream');
const Cipher = require('./Cipher');
const argv = require('./argv');

const сipher = new Cipher();

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(сipher[argv.a](chunk.toString(), argv.s));
    callback();
  }
});

module.exports = transformStream;
