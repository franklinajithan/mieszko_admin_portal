import { createTheme } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#dc2626', // Teal color for primary
    },
    secondary: {
      main: '#ff5722', // Deep orange color for secondary
    },
    background: {
      default: '#fafafa', // Very light gray background
      paper: '#ffffff',  // White paper background
    },
    text: {
      primary: '#212121', // Very dark gray text
      secondary: '#757575', // Medium gray text
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          borderRadius: 5,
          backgroundColor: '#ffffff', // White background for the grid
        },
        columnHeaders: {
          fontFamily: 'Open Sans',
          fontSize: '14px',
          color: '#666564',
          fontWeight: 'bolder',
        },
        cell: {
          fontFamily: 'Open Sans',
          color: '#47505f',
          fontSize: '14px',
          borderRight: '1px solid #e0e0e0', // Light gray border between cells
        },
        row: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#f9fafb', // Light gray for odd rows
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#ffffff', // White for even rows
          },
          '&.Mui-selected': {
            backgroundColor: '#fee2e2', // Light pink color for selected row
            '&:hover': {
              backgroundColor: '#fecaca', // Slightly darker pink on hover
            },
          },
        },
        footerContainer: {
          // Optional: Add styles for footer if needed
        },
        columnSeparator: {
          display: 'none', // This will remove the column separators, which often act as filler columns
        },
        filler: {
          display: 'none', // This will remove the filler columns
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});

export default theme;
