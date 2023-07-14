# base image
FROM node:18.16.0

LABEL Maintainer=Pramod_Khatik

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /app

# Build the project
RUN npm run build

# Expose the appropriate port for your React.js application
EXPOSE 5173

# Serve the built application using a static file server like serve
RUN npm install -g serve
CMD ["npm", "run", "serve"]
