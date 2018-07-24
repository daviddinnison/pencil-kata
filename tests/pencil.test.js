const pencil = require('../src/pencil');

describe('pencil initialization', () => {
  it('should be given a value for durability and length', () => {
    const result = new pencil(1, 2);
    expect(result.durability).toBe(1);
    expect(result.length).toBe(2);
  });
});
