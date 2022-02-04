import { render, screen, waitFor } from '@testing-library/react';

import App from './App';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('App', () => {
    it('should error when submitting a word that is not in the word list', async () => {
        render(<App />);

        const input = screen.getByRole('textbox');
        const submit = screen.getByTestId('submit');

        expect(input).toBeInTheDocument();
        expect(submit).toBeInTheDocument();

        userEvent.type(input, 'abcde');

        await waitFor(() => {
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            userEvent.click(submit);
        });

        expect(screen.getByText('Word is not in the list')).toBeInTheDocument();
    });
});
