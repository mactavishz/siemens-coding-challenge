# Siemens Coding Challenge

This repository contains a demo application for the Siemens coding challenge. The application is a simple Web application consisting of a frontend application and a backend server.

## Architecture Overview

### Frontend

- Built with **Vue.js 3** using the Composition API
- Communicates with the backend via REST API and Socket.IO for real-time updates
- Features a simple UI with:
  - A counter component that displays and updates the counter value

### Backend

- Built with **Node.js** and **Express.js**
- Implements a simple REST API for counter operations
- Uses **Socket.IO** for real-time updates across all connected clients
- Maintains counter state and update history

### Communication Flow

1. REST API endpoints for basic counter operations:
   - `GET /counter/get` - Retrieve the current counter value
   - `POST /counter/increment` - Increment the counter value
2. WebSocket connection via Socket.IO for real-time updates
   - Emits `counterUpdate` event with the new count value whenever any client increments the counter
   - All connected clients automatically receive updates without refreshing

## Project Structure

```text
.
├── backend/                # Node.js backend server
│   ├── src/                # Source code
│   │   ├── app.ts          # Express application setup with Socket.IO
│   │   ├── config.ts       # Server configuration
│   │   ├── server.ts       # Server entry point
│   │   └── model/          # Data models
│   │       ├── History.ts  # Counter update history
│   │       └── Store.ts    # Counter store implementation
│   └── tests/              # Backend unit tests
├── frontend/               # Vue.js frontend application
│   ├── src/                # Source code
│   │   ├── apis/           # API client functions
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Vue components
│   │   └── main.ts         # Application entry point
│   └── public/             # Public assets
└── cypress/                # End-to-end tests
    ├── e2e/                # Test specs
    └── screenshots/        # Test failure screenshots
```

## Setup and Running

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/) package manager

### Install Dependencies

This project uses a monorepo structure with pnpm workspaces:

```bash
# Install all dependencies from the project root
pnpm install

# if you need to add dependencies for backend or frontend separately
cd ./backend
pnpm add <package-name> # for backend

cd ./frontend
pnpm add <package-name> # for frontend
```

### Environment Configuration

1. Backend configuration (optional):
   - Create a `.env` file in the `backend/` directory:

   ```text
   # Backend environment variables
   PORT=3000
   NODE_ENV=development
   FRONTEND_URLS=http://localhost:5173,ws://localhost:5173
   ```

2. Frontend configuration (optional):
   - Create a `.env` file in the `frontend/` directory:

   ```text
   # Frontend environment variables
   VITE_BACKEND_URL=http://localhost:3000
   ```

### Running the Application

#### Development Mode

1. Start the backend server:

   ```bash
   cd ./backend
   pnpm dev
   ```

2. Start the frontend development server (in a separate terminal):

   ```bash
   cd ./frontend
   pnpm dev
   ```

3. Access the application at [http://localhost:5173](http://localhost:5173)

#### Production Mode

1. Build the frontend:

   ```bash
   cd ./frontend
   pnpm build
   ```

2. Build the backend:

   ```bash
   cd ./backend
   pnpm build
   ```

3. Start the backend server:

   ```bash
   cd ./backend
   pnpm start
   ```

## Testing

You can run the tests for both the backend and frontend separately, however, you can also run all the unit tests from the project root:

```bash
# Run all unit tests
pnpm test:unit
```

### End-to-End Tests

The project uses Cypress for end-to-end testing, which is located in the `cypress/` directory. To run the end-to-end tests, run the following commands in the project root (**make sure you have the backend and frontend servers stopped**):

```bash
# Run e2e tests in development mode
pnpm test:e2e

# Run e2e tests while opening the Cypress GUI
pnpm test:e2e:open
```

### Backend Related Tests

The backend uses Vitest for unit testing:

```bash
cd ./backend
pnpm test:unit       # Run all tests once
pnpm test:watch      # Run tests in watch mode
pnpm test:coverage   # Generate test coverage report
```

### Frontend Related Tests

The frontend uses Vitest for unit testing Vue components:

```bash
cd ./frontend
pnpm test:unit       # Run all unit tests
pnpm test:watch      # Run tests in watch mode
```

## Code Quality

### Linting

The project uses ESLint for code quality:

```bash
# Lint backend code
cd ./backend
pnpm lint

# Lint frontend code
cd ./frontend
pnpm lint
```

### TypeScript Type-Checking

Both backend and frontend are written in TypeScript:

```bash
# Type-check backend code
cd ./backend
pnpm build

# Type-check frontend code
cd ./frontend
pnpm type-check
```
