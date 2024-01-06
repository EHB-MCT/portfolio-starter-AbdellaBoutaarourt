FROM node:latest

WORKDIR /usr/src


# Copy the package.json and package-lock.json files
COPY package*.json ./


# Install the dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the app
RUN npm run build

# Expose the app's port
EXPOSE 5173

VOLUME /usr/src

# Start the app
CMD ["npm", "run" , "dev"]