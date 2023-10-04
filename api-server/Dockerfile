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

# Expose the port your Express app will run on
EXPOSE 3030

# Define the command to run your Express app
CMD ["npm", "start"]