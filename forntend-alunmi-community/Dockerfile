# Author : Vongkeo KSV

# Pull the base image 
FROM node:18-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY forntend-alunmi-community/package*.json ./

# Copy .env file from project root directory
COPY .env ./

# Install dependencies
RUN yarn install

# Copy all files from frontend-alumni-community
COPY forntend-alunmi-community/ ./

# Build app
RUN yarn build

# nginx state for serving content
FROM nginx:alpine AS production-stage

# Copy static files from build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY forntend-alunmi-community/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 8080

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]