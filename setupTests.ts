import '@testing-library/jest-dom';

globalThis.importMeta = {
    env: {
      MODE: 'test', // Or 'production', depending on your test environment
      BASE_URL: 'http://localhost', // Example URL, adjust as needed
    },
  }

  