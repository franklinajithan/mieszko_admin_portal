// __mocks__/@mui/Switch.js
const React = require('react');

const MockSwitch = React.forwardRef((props, ref) => (
  <div ref={ref} data-testid="mock-switch">
    Mock Switch
  </div>
));

module.exports = MockSwitch;