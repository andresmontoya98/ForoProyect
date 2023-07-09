import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { GreenTheme } from './GreenTheme';


// eslint-disable-next-line react/prop-types
export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={GreenTheme}>
            <CssBaseline />

            {children}
        </ThemeProvider>
    )
}

