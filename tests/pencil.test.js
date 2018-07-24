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

  it('should decrease durability by 2 if using an uppercase letter', () => {
    const result = new pencil(100, 5);
    result.write('ABC');
    expect(result.durability).toBe(94);
  });
});
