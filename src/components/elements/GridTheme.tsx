import { createTheme } from '@mui/material/styles';
import type { } from '@mui/x-data-grid/themeAugmentation';

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4', // Cyan color for primary
    },
    secondary: {
      main: '#ff5722', // Deep orange color for secondary
    },
    background: {
      default: '#fafafa', // Very light zinc background
      paper: '#ffffff',  // White paper background
    },
    text: {
      primary: '#212121', // Very dark zinc text
      secondary: '#757575', // Medium zinc text
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
          borderRight: '1px solid #e0e0e0', // Light zinc border between cells
        },
        row: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#f9fafb', // Light zinc for odd rows
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#ffffff', // White for even rows
          },
          '&.Mui-selected': {
            backgroundColor: '#e0f7fa', // Light cyan color for selected row
            '&:hover': {
              backgroundColor: '#b2ebf2', // Slightly darker cyan on hover
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
          borderRadius: 6,
          textTransform: 'none',
          boxShadow: 'none',
          background: 'linear-gradient(180deg, #22d3ee, #0891b2)', // Gradient background
          color: '#ffffff', // Text color
          fontWeight: 600, // Bold text
          //padding: '5px 5px', // Padding for button
          //transition: 'all 0.3s ease', // Smooth transition
          '&:hover': {
            background: 'linear-gradient(180deg, #0891b2, #22d3ee)', // Maintain gradient on hover
           // boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Enhanced shadow
            //transform: 'scale(1.05)', // Slightly enlarge button on hover
          },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.2)', // Focus state with shadow
          },
        },
      },
    },
  },
});

export default theme;
