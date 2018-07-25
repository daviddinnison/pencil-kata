const pencil = class {
  constructor(pencilDurability, length, eraserDurability) {
    this.durability = pencilDurability;
    this.baseDurability = pencilDurability;
    (this.eraserDurability = eraserDurability || 20), (this.length = length);
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
  }

  erase(string) {
    const text = this.currentText;
    if (!text.includes(string)) {
      throw new Error('The text you are trying to erase does not exist in the current text and cannot be erased');
    }

    const lastOccurence = this.currentText.lastIndexOf(string);
    const newBlankString = ' '.repeat(string.length);

    this.currentText = text.slice(0, lastOccurence) + text.slice(lastOccurence).replace(string, newBlankString);
  }
};

module.exports = pencil;
