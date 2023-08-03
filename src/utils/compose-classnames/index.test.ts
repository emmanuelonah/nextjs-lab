import { composeClassnames } from '.';

describe('composeClassnames', () => {
  it('should return a string of "name1 name2"', () => {
    const result = composeClassnames('name1', 'name2');
    expect(result).toBe('name1 name2');
  });

  it('should return a string of "name3 name4 true"', () => {
    const result = composeClassnames('name3', 'name4', null, undefined, 0, true, false);
    expect(result).toBe('name3 name4 true');
  });
});
