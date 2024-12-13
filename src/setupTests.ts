import "@testing-library/jest-dom";

import React from 'react';

// Mock for @emotion/cache
jest.mock('@emotion/cache', () => ({
  default: jest.fn(() => ({
    key: 'mocked-emotion',
    insert: jest.fn(), // Mock insert as a no-op function
  })),
}));

