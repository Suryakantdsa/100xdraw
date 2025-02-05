# 100xDraw

100xDraw is a real-time collaborative whiteboard tool built with WebSockets. It enables users to draw, collaborate, and share their whiteboards instantly. This project is built using a Turborepo for monorepo management and utilizes pnpm as the package manager.

## Project Structure

The project consists of the following packages:

- **ws-backend**: WebSocket server for real-time messaging.
- **http-backend**: HTTP server for REST API services.
- **react-frontend**: React-based frontend for the chat application.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-repo/roomify.git
cd roomify
```

1. Navigate to the `backend` folder:

```bash
cd backend
```

### Backend Setup

2. Install all dependencies using pnpm:

```bash
pnpm install
```

2. Start all applications simultaneously::

```bash
pnpm run dev
```

This command runs all the apps in parallel using Turborepo.

- ws-backend: Available at ws://localhost:8080
- http-backend: Available at http://localhost:8001
- react-frontend: Available at http://localhost:5173
- nextjs: Available at http://localhost:3001

## Individual Applications

### WebSocket Backend (apps/ws-backend)

1. Navigate to the WebSocket backend folder:

   ```bash
   cd apps/ws-backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the WebSocket server:

   ```bash
   pnpm run dev
   ```

### HTTP Backend (apps/http-backend)

1. Navigate to the HTTP backend folder:

   ```bash
   cd apps/http-backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the HTTP server:

   ```bash
   pnpm run dev
   ```

### React Frontend (apps/react-frontend)

1. Navigate to the React frontend folder:

   ```bash
   cd apps/react-frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the React development server:

   ```bash
   pnpm run dev
   ```

### Next.js Frontend (apps/nextjs)

1. Navigate to the Next.js frontend folder:

   ```bash
   cd apps/nextjs
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the Next.js development server:

   ```bash
   pnpm run dev
   ```

## Features

- **Real-Time Collaboration**: Draw and collaborate live with others.

- **Intuitive Drawing Tools**: Easy-to-use interface with multiple drawing options.

- **Shareable Links**: Invite others by sharing a unique link.

- **Responsive Design**: Works seamlessly on all devices.

## Scripts

- `pnpm dev`: Run all development servers.
- `pnpm build`: Build all applications.
- `pnpm lint`: Lint all applications.

## Contributing

We welcome contributions! If you find a bug or have a feature request, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
