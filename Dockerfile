# Use an official Node runtime as a base image
FROM node:12-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port on which the Node.js app will run
EXPOSE 3002

# Start the Node.js app
CMD ["npm", "start"]
