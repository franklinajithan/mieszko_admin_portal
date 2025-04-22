module.exports = {
  ThemeProvider: ({ children }) => children,
  IconButton: (props) => <button {...props} />,
  Tooltip: (props) => <div {...props}>{props.children}</div>,
};
