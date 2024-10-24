# Use the official Node.js image
FROM node:latest

# Set the working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install global dependencies
RUN npm install -g nodemon

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./ ./

CMD [ "npm","run", "start"]
#CMD ["npm" , "test"]
