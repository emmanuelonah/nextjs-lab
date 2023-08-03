import { render, screen } from '@testing-library/react';

import { If } from '.';

describe('<If/>', () => {
  it('should render `do node` because the condition is `true`', () => {
    const textNode = 'If component testing';

    render(<If condition={true} do={<h1>{textNode}</h1>} />);

    expect(screen.getByRole('heading')).toHaveTextContent(textNode);
  });

  it('should render `else node` because the condition is `false`', () => {
    render(<If condition={false} do={<h1>If component testing</h1>} else="Rendered else node" />);

    expect(screen.getByText('Rendered else node')).toBeInTheDocument();
    expect(screen.queryByText('i, If component testing')).not.toBeInTheDocument();
  });

  it('should render `null` when its true and `do node` is not provided', () => {
    const { container } = render(<If condition={true} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render `null` when its false and `else node` is not provided', () => {
    const { container } = render(<If condition={false} />);

    expect(container).toBeEmptyDOMElement();
  });
});
