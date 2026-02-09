# WebRTC Communication Project

> ⚠️ **Note:** This project is for **learning and exploration purposes only**.  
> It is not production-ready. There may be bugs, security issues, or incomplete implementations. Use at your own risk.

## Overview

This repository contains two main applications:

1. **webrtc-communication** – A Quarkus-based backend API for handling WebRTC signaling and communication.
2. **webrtc-app-react** – A React frontend for interacting with the WebRTC API.

This project is mainly intended for experimentation, learning, and understanding how Nx, Quarkus, and React can work together in a monorepo.

---

## Prerequisites

- Node.js >= 18
- Nx CLI installed globally (optional)
- Docker & Docker Compose
- Java >= 21 (for Quarkus)

---

## Available Commands

All commands are executed from the root of the monorepo using:

```
npx nx run <project>:<target>
```

---

## Backend (Quarkus)

### Start the backend in development mode

```bash

## Linux / macOS
npx nx run webrtc-communication:serve --configuration=linux
```

```bash

# Windows
npx nx run webrtc-communication:serve --configuration=windows
```

This will:
- Stop Docker containers in docker/iris (docker-compose down -v)
- Start Docker containers in docker/iris (docker-compose up -d --build)
- Run Quarkus development server

### Build the backend

```bash

## Linux / macOS
npx nx run webrtc-communication:build --configuration=linux
```

```bash

## Windows
npx nx run webrtc-communication:build --configuration=windows
```

## Run backend tests

```bash

## Linux / macOS / macOS
npx nx run webrtc-communication:test --configuration=linux
```

```bash

## Windows
npx nx run webrtc-communication:test --configuration=windows
```

---

## Frontend (React)

### Start the frontend development server

```bash

npx nx run webrtc-app-react:serve
```

### Build the frontend

```bash

npx nx run webrtc-app-react:build
```

### Run frontend tests

```bash

npx nx run webrtc-app-react:test
```

---

## Important Notes

- Not production-ready
- May contain bugs, security vulnerabilities, and incomplete features
- For learning, testing, and experimentation only
- Docker and Gradle commands assume environment is configured
- On Windows, use gradlew.bat for backend commands

---

## Folder Structures

```
apps/
  webrtc-communication/   # Quarkus backend
  webrtc-app-react/       # React frontend
docker/
  iris/                   # Docker Compose files
  ```
