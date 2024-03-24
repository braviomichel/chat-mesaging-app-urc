# UBO Relay Chat

## Objectives

UBO Relay Chat is an instant messaging application inspired by the features of IRC and WhatsApp. The goal of this project is to create an interactive communication platform where users can exchange messages in real-time. Various technologies are used such as Redis, Node.js, Crypto, and Push API

## Key Features

- Secure user authentication with session management
- Real-time sending and receiving of messages between users
- Creation and management of discussion groups
- Push notifications for new messages
- Integration of images and GIFs into conversations (experimental)

## Technologies Used

- React.js using Typescript
- Node.js
- Redis (cache)
- PostgreSQL (database)
- Crypto (for password hashing)
- Push API (used with Pusher service for push notifications)
- Vercel (for deployment and hosting)

## Installation Procedure

To install and run the project locally, follow these steps:

1. Clone the GitHub repository:

   ```bash
   git clone <repository_link>
   cd <repo>
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Set up local environments:

   - Create a `.env.development.local` file at the root of the project.
   - Retrieve the configurations of the databases created on Vercel locally:
     ```bash
     vercel env pull .env.development.local
     ```
   - Load the environment variables:
     ```bash
     export $(cat .env.development.local | xargs)
     ```

4. Execute SQL queries to initialize the database:

   ```bash
   psql -U <your_user> -d <your_database> -a -f scripts/db.sql
   ```

5. Start the development server:

   ```bash
   vercel dev
   ```

6. Access the application in your browser at the provided address.

## Contributions

This project is open to contributions. If you'd like to contribute, please fork the repository, make your changes, then open a pull request. Make sure to properly document your changes and follow coding standards.

### Notes on Password Management

For security reasons, user passwords are stored securely using SHA-256 hashing. It is recommended to never store passwords in plain text in a database. Additionally, it's advisable to use secure hashing techniques such as bcrypt for additional protection against Rainbow table attacks.

---

This document serves as the installation and usage guide for the UBO Relay Chat project. For any questions or issues, feel free to contact the project authors.
