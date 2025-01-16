# Author : Vongkeo KSV

# Pull the base image 
FROM node:18-alpine as build-stage

# set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy all files
COPY . .

# Expose port 5515
EXPOSE 5515

# start nginx in the foreground
CMD ["node", "server.js"]