The server will start on `http://localhost:4000`

## Available Scripts

- `npm run start:dev` - Start the development server with hot reload
- `npm run test:e2e` - Run integration tests
- `npm run test` - Run tests

## API Documentation

Once the server is running, you can access the Swagger documentation at:
`http://localhost:4000/docs`

### Main Endpoints

- `GET /comms/welcome-fresh/:userId` - Welcome message for new users
- `GET /comms/your-next-delivery/:userId` - Next delivery information

## Environment Variables

The application uses the following environment variables:

- `PORT` - Server port (defaults to 4000)
- `NODE_ENV` - Environment mode (development/production)

## Testing

To run the test suite:
```bash
npm test
npm run test:e2e
```
