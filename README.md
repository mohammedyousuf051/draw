# Lucky Draw API

This is the Lucky Draw API, built with Node.js, Express.js, TypeScript, and TypeORM. It uses Jest for integration and unit testing, PostgreSQL for the database, Swagger for API documentation, and Joi for request validation.

## Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **TypeORM**
- **Jest** (for integration and unit testing)
- **PostgreSQL** (for the database)
- **Swagger** (for API documentation)
- **Joi** (for request validation)
- **ESLint** (for code quality checks)
- **Prettier** (for code formatting)

## Setup Instructions

### Setting Up the App Locally Without Docker Compose

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mohammedyousuf051/draw.git```

2. **Run Docker Compose to start the database in detached mode**:
    ```docker-compose up -d db```

3. **Install dependencies**:
    ```npm install```        

4. **Build the application:**:
    ```npm run build``` 

5. **Start the application**:        
    ```npm run start```

### Running the App with a Single Command   
To run the app using Docker Compose, use the following command:

    ```docker-compose up --build```


### Code Quality and Formatting
This project uses ESLint and Prettier for code quality checks and formatting. Ensure you run these tools before committing your code.

### Database Constraints
Synchronization: Since this is not a staging environment, synchronize is set to true. When staging is considered, it should be set to false and all necessary migration scripts should be added.
Migrations: With the use of TypeORM, migrations can be managed. Include npm run migration in the app initialization process.

### API Documentation
API documentation is available via Swagger. Access it at http://localhost:3000/api-docs when the application is running.


### Request Validation
Request validation is handled using Joi. Ensure all incoming requests are validated according to the defined schemas.

### Testing
Run tests using Jest: ```npm test```