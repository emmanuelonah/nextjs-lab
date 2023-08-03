import { passwordValidation, PasswordValidator } from './index.model';

describe('passwordValidation', () => {
  describe('VALID status', () => {
    it('should confirm that valid coverage is return', () => {
      const value = passwordValidation.valid('Test@123456575');

      expect(value.status).toBe(PasswordValidator.STATUS.VALID);
      expect(value.error).toStrictEqual([]);
      expect(value.success.length).toEqual(Object.values(PasswordValidator.VALIDATION_TYPES).length);
      expect(value.success).toStrictEqual(Object.values(PasswordValidator.VALIDATION_TYPES));
    });
  });

  describe('INVALID status', () => {
    it('should confirm that invalid coverage is return', () => {
      const value = passwordValidation.valid('');

      expect(value.status).toBe(PasswordValidator.STATUS.INVALID);
      expect(value.success).toStrictEqual([]);
      expect(value.error.length).toEqual(Object.values(PasswordValidator.VALIDATION_TYPES).length);
      expect(value.error).toStrictEqual(Object.values(PasswordValidator.VALIDATION_TYPES));
    });

    it('should confirm that uppercase error is returned', () => {
      const value = passwordValidation.valid('test@123456575');

      expect(value.error).toStrictEqual([PasswordValidator.VALIDATION_TYPES.UPPERCASE]);
    });

    it('should confirm that lowercase error is returned', () => {
      const value = passwordValidation.valid('TEST@123456575');

      expect(value.error).toStrictEqual([PasswordValidator.VALIDATION_TYPES.LOWERCASE]);
    });

    it('should confirm that number error is returned', () => {
      const value = passwordValidation.valid('test@testTest');

      expect(value.error).toStrictEqual([PasswordValidator.VALIDATION_TYPES.NUMBER]);
    });

    it('should confirm that special-character error is returned', () => {
      const value = passwordValidation.valid('Test123456575');

      expect(value.error).toStrictEqual([PasswordValidator.VALIDATION_TYPES.SPECIAL_CHARACTER]);
    });

    it('should confirm that length error is returned', () => {
      const value = passwordValidation.valid('Test@1');

      expect(value.error).toStrictEqual([PasswordValidator.VALIDATION_TYPES.LENGTH]);
    });
  });
});
