module.exports = {
  presets: [
    "@babel/preset-env",        // For compiling ES6+ to a backward-compatible version
    "@babel/preset-react",      // For React JSX transformation
    "@babel/preset-typescript"  // For TypeScript support
  ],
  plugins: [
    "babel-plugin-transform-import-meta"  // Plugin to handle import.meta
  ]
};
