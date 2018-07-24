const pencil = class {
  constructor(durability, length) {
    this.durability = durability;
    this.length = length;
    this.currentText = '';
  }

  write(message) {
    if (typeof message !== 'string') {
      throw Error('Please supply a string');
    }

    this.currentText += message;
  }
};

module.exports = pencil;
