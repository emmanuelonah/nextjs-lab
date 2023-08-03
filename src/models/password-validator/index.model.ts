export type ValidationTypes = Array<keyof typeof PasswordValidator.VALIDATION_TYPES>;
export type Status = keyof typeof PasswordValidator.STATUS;
type ValidationText = { type: keyof typeof PasswordValidator.VALIDATION_TYPES; value: string };

class PasswordValidator {
  /**
   * @regexp private static RegExp
   * - (?=.*[A-Z]) asserts that the string must contain at least one uppercase letter.
   * - (?=.*[a-z]) asserts that the string must contain at least one lowercase letter.
   * - (?=.*\d) asserts that the string must contain at least one digit (number).
   * - (?=.*[~!@#$%^&*()\-_+=[\]{}\\|;:'",.<>/?]) asserts that the string must contain
   *   at least one special character (you can customize this character class if needed).
   * - [A-Za-z\d@$!%*?&]{8,} matches the string containing only uppercase letters,
   *   lowercase letters, digits, and the specified special characters,
   *   with a minimum length of 8 characters.
   */
  private static PASSWORD_REGEXP =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()\-_+=[\]{}\\|;:'",.<>/?])[A-Za-z\d@$!%*?&]{8,}$/;
  private static PASSWORD_MIN_LENGTH = 8;
  public static STATUS = {
    NONE: 'NONE',
    VALID: 'VALID',
    INVALID: 'INVALID',
  } as const;
  public static VALIDATION_TYPES = {
    UPPERCASE: 'UPPERCASE',
    LOWERCASE: 'LOWERCASE',
    NUMBER: 'NUMBER',
    SPECIAL_CHARACTER: 'SPECIAL_CHARACTER',
    LENGTH: 'LENGTH',
  } as const;

  public static VALIDATION_TEXTS: ValidationText[] = [
    { type: PasswordValidator.VALIDATION_TYPES.UPPERCASE, value: 'Must contain uppercase character' },
    { type: PasswordValidator.VALIDATION_TYPES.LOWERCASE, value: 'Must contain lowercase character' },
    { type: PasswordValidator.VALIDATION_TYPES.NUMBER, value: 'Must contain number character' },
    { type: PasswordValidator.VALIDATION_TYPES.SPECIAL_CHARACTER, value: 'Must contain special character' },
    { type: PasswordValidator.VALIDATION_TYPES.LENGTH, value: '8 character minimum' },
  ];

  private password: string | null = null;

  private onContainsUppercase(success: ValidationTypes, error: ValidationTypes) {
    if (/(?=.*[A-Z])/.test(this.password!)) {
      success.push(PasswordValidator.VALIDATION_TYPES.UPPERCASE);
    } else {
      error.push(PasswordValidator.VALIDATION_TYPES.UPPERCASE);
    }
  }

  private onContainsLowercase(success: ValidationTypes, error: ValidationTypes) {
    if (/(?=.*[a-z])/.test(this.password!)) {
      success.push(PasswordValidator.VALIDATION_TYPES.LOWERCASE);
    } else {
      error.push(PasswordValidator.VALIDATION_TYPES.LOWERCASE);
    }
  }

  private onContainsNumber(success: ValidationTypes, error: ValidationTypes) {
    if (/(?=.*\d)/.test(this.password!)) {
      success.push(PasswordValidator.VALIDATION_TYPES.NUMBER);
    } else {
      error.push(PasswordValidator.VALIDATION_TYPES.NUMBER);
    }
  }

  private onContainsSpecialCharacter(success: ValidationTypes, error: ValidationTypes) {
    if (/(?=.*[~!@#$%^&*()\-_+=[\]{}\\|;:'",.<>/?])/.test(this.password!)) {
      success.push(PasswordValidator.VALIDATION_TYPES.SPECIAL_CHARACTER);
    } else error.push(PasswordValidator.VALIDATION_TYPES.SPECIAL_CHARACTER);
  }

  private onValidateLength(success: ValidationTypes, error: ValidationTypes) {
    if (this.password!?.length >= PasswordValidator.PASSWORD_MIN_LENGTH) {
      success.push(PasswordValidator.VALIDATION_TYPES.LENGTH);
    } else {
      error.push(PasswordValidator.VALIDATION_TYPES.LENGTH);
    }
  }

  public valid(password: string) {
    if (PasswordValidator.PASSWORD_REGEXP.test(password)) {
      return {
        status: PasswordValidator.STATUS.VALID,
        success: Object.keys(PasswordValidator.VALIDATION_TYPES) as ValidationTypes,
        error: [] as ValidationTypes,
      };
    }

    this.password = password;
    const success: ValidationTypes = [];
    const error: ValidationTypes = [];

    this.onContainsUppercase(success, error);
    this.onContainsLowercase(success, error);
    this.onContainsNumber(success, error);
    this.onContainsSpecialCharacter(success, error);
    this.onValidateLength(success, error);

    return {
      status: PasswordValidator.STATUS.INVALID,
      success,
      error,
    };
  }
}

const passwordValidation = new PasswordValidator();

export { passwordValidation, PasswordValidator };
