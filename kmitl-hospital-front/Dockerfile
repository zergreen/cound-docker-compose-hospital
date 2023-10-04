# Use an official Node.js runtime as the base image
FROM node:current-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port your Express app will run on
EXPOSE 8000

# Define the command to run your Express app
CMD ["npm", "start"]