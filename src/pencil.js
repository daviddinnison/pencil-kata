const pencil = class {
  constructor(durability, length) {
    this.durability = durability;
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
      } else {
        result.push(character);
        this.durability = this.durability - 1;
      }
    });

    this.currentText += result.join('');
  }
};

module.exports = pencil;
