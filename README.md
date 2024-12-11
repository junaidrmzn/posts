# React Template for Post Assessment

This is a React-based project template designed for streamlined development and testing of post-assessment tools. It incorporates modern tooling, libraries, and configurations for scalability and ease of use.

## Features

- **React**: Built with React 18 for modern web development.
- **Vite**: High-performance build tool for lightning-fast development.
- **TypeScript**: Strongly typed JavaScript for improved reliability.
- **State Management**: Uses Zustand for simple and efficient state management.
- **Styling**: TailwindCSS for rapid styling and consistent design.
- **Testing**:
  - Jest for unit testing.
  - React Testing Library for component testing.
  - Cypress for end-to-end testing.
- **Form Validation**: React Hook Form with Zod for schema-based form validation.
- **API Calls**: Axios for HTTP requests.
- **Routing**: React Router DOM for SPA routing.
- **UI Components**: MUI (Material UI) and Styled Components for UI flexibility.
- **Linting & Formatting**:
  - ESLint for code linting.
  - Prettier for consistent code formatting.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher recommended)
- npm or Yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/junaidrmzn/posts.git
   cd posts
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Project

- **Development Mode**: Starts the development server.
  ```bash
  npm run dev
  ```

- **Build for Production**: Compiles the app for production.
  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

### Linting and Formatting

- Run ESLint to check for code issues:
  ```bash
  npm run lint
  ```

- Format code with Prettier:
  ```bash
  npm run format
  ```

### Testing

- **Run All Tests**:
  ```bash
  npm run test
  ```

- **Watch Mode**: Run tests in watch mode.
  ```bash
  npm run test:watch
  ```

- **Test Coverage**: Generate test coverage reports.
  ```bash
  npm run test:coverage
  ```

### Directory Structure

```
src/
├── apis/               # API service layer
├── assets/             # Static assets (images, fonts, etc.)
├── components/         # Reusable UI components
├── data/               # Static data or mock data
├── features/           # Feature-specific modules
├── hooks/              # Custom hooks
├── layout/             # Layout components
├── pages/              # Page components
├── provider/           # Context providers
├── routes/             # Application routes
├── utils/              # Utility functions
└── main.tsx            # Application entry point
```

### Configuration Files

- `.env`: Environment variables configuration.
- `vite.config.ts`: Vite configuration file.
- `jest.config.ts`: Jest configuration file.
- `.eslintrc.cjs`: ESLint configuration.
- `.prettierrc`: Prettier configuration.

### Scripts

Here are the available npm scripts:

| Script         | Description                                    |
| -------------- | ---------------------------------------------- |
| `npm run dev`  | Start the development server.                  |
| `npm run build`| Build the application for production.          |
| `npm run lint` | Run ESLint to check for linting errors.        |
| `npm run format`| Format the codebase using Prettier.           |
| `npm run test` | Run all unit tests.                            |
| `npm run test:watch` | Run tests in watch mode.                 |
| `npm run test:coverage` | Generate test coverage report.        |

## Dependencies

### Key Libraries

| Library                        | Purpose                                     |
| ------------------------------ | ------------------------------------------- |
| `react`                        | UI library for building the application.    |
| `zustand`                      | Lightweight state management.               |
| `axios`                        | HTTP client for API requests.               |
| `react-router-dom`             | Routing for React applications.             |
| `tailwindcss`                  | Utility-first CSS framework.                |
| `react-hook-form`              | Form state management.                      |
| `zod`                          | Schema validation for forms.                |

### Dev Dependencies

| Library                        | Purpose                                     |
| ------------------------------ | ------------------------------------------- |
| `vite`                         | Development server and build tool.          |
| `jest`                         | Unit testing framework.                     |
| `eslint`                       | Linting for code consistency.               |
| `prettier`                     | Code formatter.                             |