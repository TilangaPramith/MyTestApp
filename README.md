# My Test Project

This repository contains both the frontend and backend for the My Test Project. Follow the steps below to get the project up and running.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (v6.x or later)
- Git

## Setup Instructions

### Step 1: Clone the Repository

First, clone the repository to your local machine:
- git clone <repository-url>
- Replace <repository-url> with the actual URL of the repository.

#### Step 2: Frontend Setup

Navigate to the frontend directory, install the dependencies, and start the development server:
- cd my-test
- npm install
- npm run dev
This will start the frontend development server, typically running at http://localhost:3000.

#### Step 3: Backend Setup

Navigate to the backend directory, install the dependencies, and start the backend server in development mode:
- cd my-test-back-end
- npm install
- create a .env file with the following content:
    - JWT_SECRET=your-screte-key
- npm run start:dev

The backend server will usually start at http://localhost:3000 or another specified port.

##### Development
- The frontend runs on React.
- The backend runs on NestJS with a MongoDB database.
- Ensure both servers are running simultaneously to have the application fully operational.