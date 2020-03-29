# Caesar cipher CLI tool

## Using
```
git clone https://github.com/ProgerTyx/nodejs-course.git
cd nodejs-course
npm instal
```

## Arguments
```
-s, --shift: a shift or key to cipher (the number from 1 to 25)
-i, --input: an input file name
-o, --output: an output file name
-a, --action: option to set action (encode/decode)
```

## Running application example
```
node ceasar-cipher-cli.js -a encoded -s 5 -i input.txt -o output.txt
```

# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To test without authorization

```
npm test
```

To test with authorization

```
npm run test:auth
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
