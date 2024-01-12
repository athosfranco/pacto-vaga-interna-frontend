# Use an official Node runtime as a parent image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use a smaller base image for the final build
FROM nginx:alpine

# Copy the built Angular app from the previous build stage
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expose port 80 for the Angular app
EXPOSE 80

# Default command to start the nginx server
CMD ["nginx", "-g", "daemon off;"]
