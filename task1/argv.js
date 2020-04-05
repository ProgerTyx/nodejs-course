/* eslint-disable */
const parseArgs = require('minimist');

process.on('exit', code => {
  process.stderr.write(`Application failed with error: ${code} \n`);
});

const args = process.argv.slice(2);
const argv = parseArgs(args, {
  string: ['action', 'input', 'output'],
  alias: {
    a: 'action',
    s: 'shift',
    i: 'input',
    o: 'output'
  },
  unknown: () => {
    process.stderr.write('Unknown argument \n');
    process.exit(-1);
  }
});

if (!argv.s || !argv.a) {
  process.stderr.write('Required argument not found \n');
  process.exit(-2);
}

module.exports = argv;
