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
      if (character.toUpperCase() === character) {
        result.push(character);
        this.durability = this.durability - 2;
      } else {
        result.push(character);
      }
    });

    this.currentText += result.join('');
  }
};

module.exports = pencil;
