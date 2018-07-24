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
});
