import React from 'react';
import styled from 'styled-components';

import { If } from 'components';
import { composeEvents, composeClassnames } from 'utils';
import { usePasswordValidatorPresenter, PasswordValidator } from 'models';

const ValidationList = styled.ul`
  & li {
    color: ${({ theme }) => theme.colors.dark200};

    &.li--success {
      color: ${({ theme }) => theme.colors.success400};
    }

    &.li--error {
      color: ${({ theme }) => theme.colors.error400};
    }
  }
`;

type PrimitiveInputPropTypes = React.ComponentPropsWithoutRef<'input'>;
type PasswordInputElement = React.ElementRef<'input'>;
interface PasswordInputPropTypes extends PrimitiveInputPropTypes {
  label?: string;
}

export const PasswordInput = React.forwardRef<PasswordInputElement, PasswordInputPropTypes>(function PasswordInput(
  { label, onChange, id, ...restProps },
  forwardedRef
) {
  const { state, onValidate } = usePasswordValidatorPresenter();

  return (
    <>
      <If condition={label != void 0} do={<label htmlFor={id}>{label}</label>} />

      <input
        {...restProps}
        ref={forwardedRef}
        type="password"
        id={id}
        onChange={composeEvents(
          (ev) => onValidate((ev as React.ChangeEvent<HTMLInputElement>).target.value),
          onChange!
        )}
      />

      <ValidationList>
        {PasswordValidator.VALIDATION_TEXTS.map(({ type, value }) => (
          <li
            key={type}
            className={composeClassnames(
              state.error.includes(type) && 'li--error',
              state.success.includes(type) && 'li--success'
            )}
          >
            {value}
          </li>
        ))}
      </ValidationList>
    </>
  );
});
