# Use the official Node.js image as a base image
FROM node:20.14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . /app

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "dev:server"]