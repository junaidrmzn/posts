import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_API_URL: 'https://frontend-test-be.stage.thinkeasy.cz/',
      },
    },
  },
});
