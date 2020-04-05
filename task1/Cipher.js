module.exports = class Cipher {
  constructor() {
    this.alphabet = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];
  }

  encode(string, shift) {
    const symbArr = string.split('');
    const alphLenght = this.alphabet.length;

    const result = symbArr.map(symb => {
      const idx = this.alphabet.indexOf(symb.toUpperCase());

      if (idx !== -1) {
        let next = idx + shift;
        while (next > alphLenght - 1) {
          next = next - alphLenght;
        }
        return inLowerCase(symb)
          ? this.alphabet[next].toLowerCase()
          : this.alphabet[next];
      }

      return symb;
    });

    return result.join('');
  }

  decode(string, shift) {
    const symbArr = string.split('');
    const alphLenght = this.alphabet.length;

    const result = symbArr.map(symb => {
      const idx = this.alphabet.indexOf(symb.toUpperCase());

      if (idx !== -1) {
        let next = idx - shift;
        while (next < 0) {
          next = next + alphLenght;
        }
        return inLowerCase(symb)
          ? this.alphabet[next].toLowerCase()
          : this.alphabet[next];
      }

      return symb;
    });

    return result.join('');
  }
};

function inLowerCase(symbol) {
  return symbol.toLowerCase() === symbol;
}
