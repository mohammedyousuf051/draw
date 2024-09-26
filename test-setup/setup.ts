import { execSync } from 'child_process';

module.exports = async () => {
  process.env.NODE_ENV = 'test';
  execSync('docker-compose -f docker-compose.test.yml up -d');
  // Wait for the database to be ready
  await new Promise(resolve => setTimeout(resolve, 5000)); 
};