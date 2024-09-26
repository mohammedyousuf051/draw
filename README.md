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

3. **Run Docker Compose to start the database in detached mode**:
   
       docker-compose up -d db

5. **Install dependencies**:
   
       npm install     

7. **Build the application:**:
   
       npm run build

9. **Start the application**:
         
       npm run start

### Running the App with a Single Command   
To run the app using Docker Compose, use the following command:


       docker-compose up --build


### Code Quality and Formatting
This project uses ESLint and Prettier for code quality checks and formatting. Ensure you run these tools before committing your code.

      npm run lint
      npm run format

### Database Constraints
Synchronization: Since this is not a staging environment, synchronize is set to true. When staging is considered, it should be set to false and all necessary migration scripts should be added.
Migrations: With the use of TypeORM, migrations can be managed. Include npm run migration in the app initialization process.

### API Documentation
API documentation is available via Swagger. Access it at 
   http://localhost:3000/api-docs 
when the application is running.


### Request Validation
Request validation is handled using Joi. Ensure all incoming requests are validated according to the defined schemas.

### Testing
Run tests using Jest: 

      npm test


## How this can be Improved

### 1. Outline the Limitations of Your System and How You Would Improve It
Limitations

### Database Synchronization:

   Current State: The synchronize option in TypeORM is set to true, which is not suitable for production environments as it can lead to data loss.
   Improvement: Set synchronize to false in production and use migration scripts to manage database schema changes.

Scalability:

Current State: The application is designed to run on a single instance, which may not handle high traffic efficiently.
Improvement: Implement horizontal scaling using container orchestration tools like Kubernetes. Use a load balancer to distribute traffic across multiple instances.

### Error Handling:

Current State: Basic error handling is implemented, but it may not cover all edge cases.
Improvement: Implement comprehensive error handling and logging using tools like datadog.

### Security:

Current State: Basic security measures are in place, but there may be vulnerabilities.
Improvement: Implement security best practices such as input validation, rate limiting, and secure headers. 

### Testing:

Current State: Unit and integration tests are implemented using Jest, but coverage may not be comprehensive.
Improvement: Increase test coverage and include end-to-end tests using tools like Cypress/playwright. 


### 2. Quantify the System Performance of Your Implementation
To quantify the system performance, you can use tools like Apache JMeter, Artillery, or Locust to measure metrics such as requests per second (RPS) and response time. Here is an example of how you might measure these metrics:

Example Performance Metrics
### Requests Per Second (RPS):

Measurement: Use a load testing tool to simulate a high number of concurrent requests and measure the number of requests the system can handle per second.
Example: The system can handle 500 RPS under a load of 1000 concurrent users.
Response Time:

Measurement: Measure the time taken to respond to requests under different loads.
Example: The average response time is 200ms under a load of 1000 concurrent users.

### Steps to Measure Performance

Set Up Load Testing Tool:

Use a tool like Apache JMeter, Artillery, or Locust.
Define test scenarios with different levels of concurrency and request rates.

## Database Association Choice, Why I approached this way?

`draw` - `participants` 
(Not Included separate table for `tickets`)

Since, this app is straight forward, I thought of having ticketNumber in participant table itself to reduce the overheads and lookups.

### Reasons to Include a Tickets Table
- **Unique Ticket Management**:
  If we want to maintain a separate identity for each ticket, especially if tickets have unique numbers and may carry additional attributes (like status), having a dedicated Tickets table makes sense.

- **Tracking Ticket Information**:
    If we plan to store more details about each ticket (e.g., issuance time, status, or even a history of ticket transfers), a separate table provides a clear structure.

- **Simplified Queries**:
Queries related to tickets (like fetching all tickets for a draw or determining winner tickets) can be simpler and more efficient with a dedicated table.

- **Future Scalability**:
If application to grow in complexity (e.g., adding features like ticket transfers, ticket sales, etc.), having a separate Tickets table can make it easier to implement these features later.

### Reasons to Omit the Tickets Table
- **Simplicity**:
    If each participant is guaranteed to have only one ticket and there are no additional complexities, database model can be simplified by storing ticket information directly in the Participant table.

- **Reduced Overhead**:
    Fewer tables can lead to reduced database management overhead and potentially better performance for simple queries.

- **Direct Association**:
    Since it seems to have direct assoiciation without no any additional info, so having that in separate Column make sense to me, also considering the totalTicket can go upto 10**8.
