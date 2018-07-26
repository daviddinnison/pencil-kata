const pencil = class {
  constructor(pencilDurability, length, eraserDurability) {
    if (pencilDurability < 0 || typeof pencilDurability !== 'number') {
      throw new Error('Please supply a value for pencil durability as the first argument');
    }

    if (length < 0 || typeof length !== 'number') {
      throw new Error('Please supply an absolute number for pencil length as the second argument');
    }

    this.durability = pencilDurability;
    this.baseDurability = pencilDurability;
    this.eraserDurability = eraserDurability || 20;
    this.length = length;
    this.currentText = '';
  }

  write(message) {
    let result = [];

    if (typeof message !== 'string') {
      throw Error('Please supply a string');
    }

    message.split('').forEach(character => {
      //   case for not enough durability. the second statement is there to make sure uppercase letters are calculated correctly since they degrade faster
      if (this.durability < 1 || (/^[A-Z]/.test(character) && this.durability < 2)) {
        result.push(' ');
      }

      //   space
      else if (character === ' ') {
        result.push(character);
      }
      //   uppercase
      else if (/^[A-Z]/.test(character)) {
        result.push(character);
        this.durability = this.durability - 2;
      }
      //   lowercase
      else if (/^[a-z]/.test(character)) {
        result.push(character);
        this.durability = this.durability - 1;
      }

      // uppercase letter with accent
      else if (/[A-Z\u00C0-\u00DC]+/.test(character)) {
        result.push(character);
        this.durability = this.durability - 2;
      }

      //   everything else
      else {
        result.push(character);
        this.durability = this.durability - 1;
      }
    });

    this.currentText += result.join('');
  }

  sharpen() {
    if (this.length < 1) {
      throw new Error('The pencil is not long enough to be sharpened.');
    }

    this.durability = this.baseDurability;
    this.length--;
  }

  erase(string) {
    const text = this.currentText;
    if (!text.includes(string)) {
      throw new Error('The text you are trying to erase does not exist in the current text and cannot be erased');
    }

    const eraseString = string
      .split('')
      .reverse()
      .map(character => {
        if (this.eraserDurability < 1 && character !== ' ') {
          return character;
        }

        this.eraserDurability--;
        return ' ';
      })
      .reverse()
      .join('');

    const lastOccurence = this.currentText.lastIndexOf(string);
    const beforeEraseString = text.slice(0, lastOccurence);
    const afterEraseString = text.slice(lastOccurence).replace(string, eraseString);

    this.currentText = beforeEraseString + afterEraseString;
  }

  edit(string, position) {
    const text = this.currentText;
    if (typeof string !== 'string') {
      throw new Error('Please supply a string for editing');
    }

    if (typeof position !== 'number') {
      throw new Error('Please supply a valid number for positioning the string to edit');
    }

    if (position > text.length || position < 0) {
      throw new Error('The position you supplied does exist in the text');
    }

    const newStringMiddle = text
      .substring(position, position + string.length)
      .split('')
      .map((character, i) => {
        if (character !== ' ') {
          return '@';
        }
        return string.charAt(i);
      })
      .join('');

    const newStringBeginning = text.substring(0, position);
    const newStringEnd = text.substring(position + string.length);

    this.currentText = newStringBeginning + newStringMiddle + newStringEnd;
  }
};

module.exports = pencil;
