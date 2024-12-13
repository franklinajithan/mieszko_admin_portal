module.exports = {
    styled: (Component) => (styles) => (props) =>
      React.createElement(Component, { ...props, styles }),
    createTheme: jest.fn(),
    ThemeProvider: jest.fn(({ children }) => children),
  };