# Use the official Node.js image based on Alpine Linux.
# This image already contains:
# - Alpine Linux
# - Node.js
# - npm
FROM node:alpine

# Set /app as the working directory inside the container.
# Equivalent to:
#   mkdir -p /app
#   cd /app
WORKDIR /app

# Copy package.json and package-lock.json from the host
# machine into the container.
#
# Copying these separately allows Docker to cache the
# npm install layer if dependencies don't change.
COPY package*.json ./

# Install dependencies listed in package.json.
#
# During build, Docker:
# 1. Creates an intermediate container.
# 2. Runs npm install.
# 3. Creates node_modules.
# 4. Takes a filesystem snapshot.
# 5. Stores it as an image layer.
# 6. Removes the intermediate container.
RUN npm install

# Copy the application's source code.
#
# Host:
#   src/index.js
#
# Container:
#   /app/src/index.js
COPY ./src ./src

# Default command executed when the container starts.
#
# This runs:
#   npm start
#
# npm reads package.json:
#   "start": "node ./src/index.js"
#
# Result:
#   node ./src/index.js
#
# The Node.js process becomes PID 1 inside the container.
CMD ["npm","start"]

# ---------------------------------------------------------
# Build the image:
#
# docker build -t adarsh893/small-nodejs-app .
#
# -t                            -> Assign image name/tag
# adarsh893                     -> Docker Hub username
# small-nodejs-app             -> Repository name
# .                            -> Current directory (build context)
#
# ---------------------------------------------------------
# Run the container:
#
# docker run -p 8080:8000 adarsh893/small-nodejs-app
#
# Port Mapping:
#
# Host (Mac)        Container
# localhost:8080 -> localhost:8000
#
# Browser
#    ↓
# http://localhost:8080
#    ↓
# Docker Port Forwarding
#    ↓
# Node.js app listening on port 8000
#
# Note:
# The Express application must listen on port 8000:
#
# app.listen(8000);
#
# ---------------------------------------------------------
# Push to Docker Hub:
#
# docker login
# docker push adarsh893/small-nodejs-app
#
# Pull from Docker Hub:
#
# docker pull adarsh893/small-nodejs-app
# ---------------------------------------------------------