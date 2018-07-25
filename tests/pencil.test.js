const pencil = require('../src/pencil');

describe('pencil initialization', () => {
  it('should be given a value for durability and length', () => {
    const result = new pencil(1, 2);
    expect(result.durability).toBe(1);
    expect(result.length).toBe(2);
  });
});

describe('pencil writing functionality', () => {
  it('should accept a string as an input', () => {
    const result = new pencil(100, 5);
    result.write('test');
    expect(result.currentText).toBe('test');
  });

  it('should not accept anything besides strings as an input', () => {
    const badTypes = [null, undefined, NaN, 0, false];
    const result = new pencil(100, 5);
    badTypes.forEach(arg => {
      expect(() => {
        result.write(arg);
      }).toThrow();
    });
  });

  it('should append additional messages to the existing message', () => {
    const result = new pencil(100, 5);
    const message1 = 'this is message 1';
    const message2 = 'this is message 2';
    result.write(message1);
    result.write(message2);

    expect(result.currentText).toBe(message1 + message2);
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
    expect(result.durability).toBe(99);
    expect(result.currentText).toBe(' a   ');
  });

  it('should decrease durability by 1 for misc characters', () => {
    const result = new pencil(100, 5);
    result.write('!?');
    expect(result.durability).toBe(98);
    expect(result.currentText).toBe('!?');
  });
});

describe('durability functionality', () => {
  it('durability should not be less than zero', () => {
    const result = new pencil(1, 2);
    result.write('abc');
    expect(result.durability).toBe(0);
  });

  it('should write spaces if there is no more durability', () => {
    const result = new pencil(2, 2);
    result.write('abc');
    expect(result.currentText).toBe('ab ');
  });

  it('should account for uppercase letter degradation', () => {
    const result = new pencil(3, 2);
    result.write('ABC');
    expect(result.durability).toBe(1);
    expect(result.currentText).toBe('A  ');
  });
});

describe('sharpening functionality', () => {
  it('should allow the ability to sharpen to initial durability value if long enough', () => {
    const result = new pencil(1, 1);
    result.write('a');
    result.sharpen();
    expect(result.durability).toBe(1);
  });
});
