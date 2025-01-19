import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import React from 'react'

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue([
    { "s.no": 1, "percentage.funded": 50, "amt.pledged": 500 },
    { "s.no": 2, "percentage.funded": 60, "amt.pledged": 600 },
    { "s.no": 3, "percentage.funded": 70, "amt.pledged": 700 },
    { "s.no": 4, "percentage.funded": 80, "amt.pledged": 800 },
    { "s.no": 5, "percentage.funded": 90, "amt.pledged": 900 },
    { "s.no": 6, "percentage.funded": 100, "amt.pledged": 1000 },
    { "s.no": 7, "percentage.funded": 50, "amt.pledged": 500 },
  ])
});

describe('App Component', () => {

  test('renders the correct data and theme', async () => {
    const { container } = render(<App theme="light" />);

    await waitFor(() => {
      expect(screen.getByText('S.No.')).toBeInTheDocument();
      expect(screen.getByText('Percentage funded')).toBeInTheDocument();
      expect(screen.getByText('Amount pledged')).toBeInTheDocument();

      const firstRow = screen.getAllByRole('row')[1]; // Skip header row
      expect(firstRow).toHaveTextContent('1');
      expect(firstRow).toHaveTextContent('50');
      expect(firstRow).toHaveTextContent('500');
    });

    expect(container.querySelector('.tableItems')?.classList.contains('light')).toBe(true);
  });

  test('renders dark theme correctly', async () => {
    const { container } = render(<App theme="dark" />);

    await waitFor(() => {
      expect(container.querySelector('.tableItems')?.classList.contains('dark')).toBe(true);
    });
  });

  test('pagination works: next and prev buttons', async () => {
    render(<App theme="light" />);

    await waitFor(() => {
      expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Go to next page'));
    
    expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Go to previous page'));
    expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
  });

  test('pagination shows correct page numbers', async () => {
    render(<App theme="light" />);

    await waitFor(() => {
      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();
    });
  });

  test('aria-labels are correctly applied for buttons', async () => {
    render(<App theme="light" />);

    // Wait for buttons to appear
    await waitFor(() => {
      expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();

      const page2Button = screen.getByLabelText('Go to page 2');
      expect(page2Button).toBeInTheDocument();
    });
  });

  test('pagination button has active class when on current page', async () => {
    render(<App theme="light" />);

    await waitFor(() => {
      const page2Button = screen.getByLabelText('Go to page 2');
      fireEvent.click(page2Button);
      expect(page2Button).toHaveClass('active');
    });
  });
});
