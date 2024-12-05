module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript testing
  testEnvironment: "jest-environment-jsdom", // Use jsdom for DOM testing
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Setup test environment
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // Use babel-jest for transformation (supports ESM)
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/components/elements", // Exclude from coverage but not from testing
    "<rootDir>/src/components/ui",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/src/components/elements", // Ignore this folder in the test run
    "<rootDir>/src/components/ui",
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!module-to-transform)", // Adjust for specific node_modules requiring transformation
    "node_modules/(?!(@mui|@emotion)/)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Resolve aliases from tsconfig.json (e.g., '@/service' becomes 'src/service')
    "\\.css$": "identity-obj-proxy", // Mock CSS files
    "\\.scss$": "identity-obj-proxy", // Mock SCSS files
    "\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock static assets
    "^@mui/icons-material/(.*)$": "<rootDir>/__mocks__/muiIconsMock.js",
    "^@mui/material/IconButton$": "<rootDir>/__mocks__/muiMaterialMock.js",
    "^@mui/material/Tooltip$": "<rootDir>/__mocks__/muiMaterialMock.js",
    "^@mui/material/styles$": "<rootDir>/__mocks__/muiThemeMock.js",
    "^@mui/material$": "<rootDir>/__mocks__/muiMaterialMock.js",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true, // Skip type-checking for performance
    },
  },
  moduleDirectories: [
    "node_modules",
    "<rootDir>/src", // Ensure module resolution includes the 'src' folder for aliases
  ],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js|jsx)", // Match test files in __tests__ directories
    "**/?(*.)+(spec|test).(ts|tsx|js|jsx)", // Match spec/test files
  ],
  verbose: true, // Display individual test results
};
