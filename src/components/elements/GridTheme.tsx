import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#ff5722',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    action: {
      active: '#757575', // Default action color
      hover: '#e0f7fa',  // Light cyan on hover
      selected: '#b2ebf2', // Slightly darker cyan for selected elements
      disabled: '#e0e0e0',
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
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          borderRadius: 5,
          backgroundColor: '#ffffff',
          '& .MuiDataGrid-cell': {
            color: '#47505f',
            fontSize: '14px',
            borderRight: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontSize: '14px',
            color: '#666564',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-columnSeparator': {
            color: '#e0e0e0',
          },
          '& .MuiDataGrid-row': {
            '&:nth-of-type(odd)': {
              backgroundColor: '#f9fafb',
            },
            '&:nth-of-type(even)': {
              backgroundColor: '#ffffff',
            },
            '&.Mui-selected': {
              backgroundColor: '#e0f7fa',
              '&:hover': {
                backgroundColor: '#b2ebf2',
              },
            },
          },
        },
        toolbarContainer: {
          padding: '0.5rem',
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          boxShadow: 'none',
          background: 'linear-gradient(180deg, #22d3ee, #0891b2)',
          color: '#ffffff',
          fontWeight: 600,
          '&:hover': {
            background: 'linear-gradient(180deg, #0891b2, #22d3ee)',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.2)',
          },
        },
        contained: {
          backgroundColor: '#00bcd4',
          '&:hover': {
            backgroundColor: '#0097a7',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: '#fafafa',
          fontSize: '0.875rem',
        },
        toolbar: {
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        },
        select: {
          fontSize: '0.875rem',
        },
        selectIcon: {
          color: '#757575',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#00bcd4',
          color: '#ffffff',
          fontSize: '0.875rem',
          borderRadius: 4,
          padding: '8px 12px',
        },
        arrow: {
          color: '#00bcd4',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
          padding: '1rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#00bcd4',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00bcd4',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#757575',
          '&:hover': {
            color: '#00bcd4',
          },
        },
      },
    },
  },
});

export default theme;
