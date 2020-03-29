const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const argv = require('./argv');

const transformStream = require('./transformStream')

const isExistPath = fileName => {
    if (!fs.existsSync(path.join(__dirname, fileName))) {
        process.stderr.write('Input or Output file cannot be reached \n');
        process.exit(-3);
    }
    return fileName;
};

const readeStream = () => !argv.i ? process.stdin : fs.createReadStream(path.join(__dirname, isExistPath(argv.i)));
const writeStream = () => !argv.o ? process.stdout : fs.createWriteStream(path.join(__dirname, isExistPath(argv.o)), { flags: 'a' });

pipeline(
    readeStream(),  
    transformStream,
    writeStream(),
    (err) => {
        if (err) {
            process.stderr.write('Input or Output file cannot be reached \n');
        } else {
            process.stderr.write('Success \n')
        }
    }
)

