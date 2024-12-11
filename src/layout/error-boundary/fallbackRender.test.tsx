import { render, screen, fireEvent } from '@testing-library/react';
import fallbackRender from './fallbackRender'; // Adjust the path as necessary
import { FallbackProps } from 'react-error-boundary';

describe('fallbackRender', () => {
  const mockResetErrorBoundary = jest.fn();

  const props: FallbackProps = {
    error: { message: 'Test error message' },
    resetErrorBoundary: mockResetErrorBoundary,
  };

  it('renders the error message and try again button', () => {
    render(<>{fallbackRender(props)}</>);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();

    const errorMessage = screen.getByText(/Test error message/i);
    expect(errorMessage).toBeInTheDocument();

    const tryAgainButton = screen.getByRole('button', { name: /Try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when "Try again" button is clicked', () => {
    render(<>{fallbackRender(props)}</>);

    const tryAgainButton = screen.getByRole('button', { name: /Try again/i });

    fireEvent.click(tryAgainButton);

    expect(mockResetErrorBoundary).toHaveBeenCalled();
  });
});
