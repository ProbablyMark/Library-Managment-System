import * as fs from 'fs';
import * as readline from 'readline';

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for input
rl.question('Enter the POSTGRES_HOST: ', (POSTGRES_HOST: string) => {
  rl.question('Enter the POSTGRES_DB: ', (POSTGRES_DB: string) => {
    rl.question('Enter the POSTGRES_USER: ', (POSTGRES_USER: string) => {
      rl.question(
        'Enter the POSTGRES_PASSWORD: ',
        (POSTGRES_PASSWORD: string) => {
          // Create the .env file content
          const envContent = `
POSTGRES_HOST=${POSTGRES_HOST}
POSTGRES_DB=${POSTGRES_DB}
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
`;

          // Write to the .env file
          fs.writeFileSync('.env', envContent);

          console.log('.env file created successfully.');
          rl.close();
        }
      );
    });
  });
});
