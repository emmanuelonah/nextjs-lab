import { render, screen, fireEvent } from '@testing-library/react';

import { dummyConnect } from '.';

const mockedOnLog = jest.fn();

describe('redux-helpers', () => {
  describe('dummyConnect', () => {
    it('should augment component prop', () => {
      function LogComponent(props: { log: () => void }) {
        return (
          <button type="button" onClick={props.log}>
            Log
          </button>
        );
      }
      function mapStateToProps(_s: any) {
        console.log('HURRAY: mapStateToProps is executed 🎉');
      }

      const mapDispatchToProps = {
        log: (_p: any) => {
          console.log('LOGGING ☕️');
          mockedOnLog();
        },
      };

      const Component = dummyConnect(mapStateToProps, mapDispatchToProps)(LogComponent as React.FunctionComponent);

      render(<Component />);

      fireEvent.click(screen.getByText('Log'));
      expect(mockedOnLog).toHaveBeenCalled();
    });
  });
});
