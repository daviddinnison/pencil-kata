const pencil = require('../src/pencil');

describe('pencil initialization', () => {
  it('should be given a value for durability and length', () => {
    const result = new pencil(1, 2);

    expect(result).toEqual(expect.objectContaining({ durability: 1, length: 2 }));
  });

  it('should throw an error if a pencil is created without durability', () => {
    const message = 'Please supply a value for pencil durability as the first argument';

    expect(() => {
      new pencil();
    }).toThrow(message);
  });
});

describe('pencil writing functionality', () => {
  it('should accept a string as an input', () => {
    const result = new pencil(100, 5);

    result.write('test');
    expect(result.currentText).toMatch('test');
  });

  it('should not accept anything besides strings as an input', () => {
    const badTypes = [null, undefined, NaN, 0, false];
    const result = new pencil(100, 5);

    badTypes.forEach(arg => {
      expect(() => {
        result.write(arg);
      }).toThrow('Please supply a string');
    });
  });

  it('should append additional messages to the existing message', () => {
    const result = new pencil(100, 5);

    const message1 = 'this is message 1';
    const message2 = 'this is message 2';

    result.write(message1);
    result.write(message2);

    expect(result.currentText).toMatch(message1 + message2);
  });

  it('should decrease durability by 2 if writing an uppercase letter', () => {
    const result = new pencil(100, 5);

    result.write('ABC');
    expect(result.durability).toBe(94);
  });

  it('should decrease durability by 1 if writing a lowercase letter', () => {
    const result = new pencil(100, 5);

    result.write('abc');
    expect(result.durability).toBe(97);
  });

  it('should not decrease durability if writing a space', () => {
    const result = new pencil(100, 5);

    result.write(' a   ');
    expect(result).toEqual(expect.objectContaining({ durability: 99, currentText: ' a   ' }));
  });

  it('should decrease durability by 1 for misc characters', () => {
    const result = new pencil(100, 5);

    result.write('!?');
    expect(result).toEqual(expect.objectContaining({ durability: 98, currentText: '!?' }));
  });
});

describe('durability functionality', () => {
  it('durability should not be less than zero', () => {
    const result = new pencil(1, 2);

    result.write('abc');
    expect(result.durability).toBe(0);
  });

  it('should write spaces in place of characters if there is no more durability', () => {
    const result = new pencil(2, 2);

    result.write('abc');
    expect(result.currentText).toMatch('ab ');
  });

  it('should account for uppercase letter degradation', () => {
    const result = new pencil(3, 2);

    result.write('ABC');
    expect(result).toEqual(expect.objectContaining({ durability: 1, currentText: 'A  ' }));
  });

  it('should account for accented/special uppercase letters', () => {
    const result = new pencil(6, 2);

    result.write('aÉÙ 1');
    expect(result).toEqual(expect.objectContaining({ durability: 0, currentText: 'aÉÙ 1' }));
  });
});

describe('sharpening functionality', () => {
  it('should allow the ability to sharpen to initial durability value if long enough', () => {
    const result = new pencil(1, 1);

    result.write('a');
    result.sharpen();
    expect(result.durability).toBe(1);
  });

  it('should not allow sharpening if the pencil is too short', () => {
    const result = new pencil(100, 0);

    expect(() => {
      result.sharpen();
    }).toThrow('The pencil is not long enough to be sharpened.');
  });
});

describe('eraser functionality', () => {
  it('should throw an error if the string to erase is not in the current text', () => {
    const result = new pencil(200, 5);
    const message = 'The text you are trying to erase does not exist in the current text and cannot be erased';

    result.write('How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
    expect(() => {
      result.erase('metal');
    }).toThrow(message);
  });

  it('should erase the last occurence of a word', () => {
    const result = new pencil(200, 5);
    const expectedResult = 'How much wood would a woodchuck chuck if a woodchuck could       wood?';

    result.write('How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
    result.erase('chuck');
    expect(result.currentText).toMatch(expectedResult);
  });

  it('should erase the last occurence of a word multiple times', () => {
    const result = new pencil(200, 5);
    const expectedResult = 'How much wood would a woodchuck chuck if a wood      could       wood?';

    result.write('How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
    result.erase('chuck');
    result.erase('chuck');
    expect(result.currentText).toMatch(expectedResult);
  });
});

describe('eraser degradation functionality', () => {
  it('if eraser durability is not supplied on pencil creation its value will be set to a default value of 20', () => {
    const result = new pencil(200, 5);

    expect(result.eraserDurability).toBe(20);
  });

  it('if eraser durability is supplied on pencil creation its value should match the input', () => {
    const result = new pencil(200, 5, 100);

    expect(result.eraserDurability).toBe(100);
  });

  it('eraser should degrade for each character it erases, excluding blank space', () => {
    const result = new pencil(200, 5);

    result.write('Buffalo Bill');
    result.erase('Bill');
    expect(result).toEqual(expect.objectContaining({ eraserDurability: 16, currentText: 'Buffalo     ' }));
  });

  it('eraser should erase from left to right, and if the eraser has 0 durability it will return the original character', () => {
    const result = new pencil(200, 5, 3);

    result.write('Buffalo Bill');
    result.erase('Bill');
    expect(result).toEqual(expect.objectContaining({ eraserDurability: 0, currentText: 'Buffalo B   ' }));
  });
});

describe('editing functionality', () => {
  it('should accept a desired string and a position to edit', () => {
    const result = new pencil(200, 5);

    result.write('An       a day keeps the doctor away');
    expect(() => {
      result.edit(1, 1);
    }).toThrow('Please supply a string for editing');

    expect(() => {
      result.edit('onion', 'david');
    }).toThrow('Please supply a valid number for positioning the string to edit');
  });

  it('should throw an error if the position does not exist in the text', () => {
    const result = new pencil(200, 5);

    result.write('abc');
    expect(() => {
      result.edit('a', 10);
    }).toThrow('The position you supplied does exist in the text');
    expect(() => {
      result.edit('a', -1);
    }).toThrow('The position you supplied does exist in the text');
  });

  it('should edit over whitespace with the given character, and replace existing characters with the @ character', () => {
    const result = new pencil(100, 5);

    result.write('An       a day keeps the doctor away');
    result.edit('artichoke', 3);
    expect(result.currentText).toMatch('An artich@k@ay keeps the doctor away');
  });
});
