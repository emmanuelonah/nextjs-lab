import { render, screen, fireEvent } from '@testing-library/react';

import { dummyConnect } from '.';

const mockedOnLog = jest.fn();

type PropableState = {
  name: string;
  profession: string;
  nationality: string;
};

describe('redux-helpers', () => {
  describe('dummyConnect', () => {
    it('should augment component prop', () => {
      function LogComponent({ log, ...rest }: { log: (_s: PropableState) => void } & PropableState) {
        return (
          <button type="button" onClick={() => log(rest as PropableState)}>
            Log
          </button>
        );
      }
      function mapStateToProps(s: PropableState) {
        console.log('HURRAY: mapStateToProps is executed 🎉', s);
      }

      const mapDispatchToProps = {
        log: (s: PropableState) => {
          console.log('LOGGING ☕️', s);
          mockedOnLog();
        },
      };

      const Component = dummyConnect(
        mapStateToProps as any,
        mapDispatchToProps as any
      )(LogComponent as React.FunctionComponent);

      render(<Component />);

      fireEvent.click(screen.getByText('Log'));
      expect(mockedOnLog).toHaveBeenCalled();
    });
  });
});
