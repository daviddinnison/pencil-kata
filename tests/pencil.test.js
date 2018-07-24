const pencil = require('../src/pencil');

describe('initial sanity check', () => {
  it('should return the same input as a val', () => {
    const result = new pencil(1);
    expect(result.val).toBe(1);
  });
});

console.log(pencil);
