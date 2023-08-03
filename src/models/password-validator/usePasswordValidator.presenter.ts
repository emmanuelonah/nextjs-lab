import { useState, useCallback } from 'react';

import { passwordValidation, PasswordValidator, Status, ValidationTypes } from './index.model';

type State = {
  status: Status;
  success: ValidationTypes;
  error: ValidationTypes;
};

const initialState: State = {
  status: PasswordValidator.STATUS.NONE,
  success: [],
  error: [],
};

function usePasswordValidatorPresenter() {
  const [state, setState] = useState(initialState);

  const onValidate = useCallback((password: string) => {
    const value = passwordValidation.valid(password);

    setState((prev) => ({ ...prev, ...value }));
  }, []);

  return { state, onValidate };
}

export { PasswordValidator, usePasswordValidatorPresenter };
