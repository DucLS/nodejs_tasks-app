FROM node:lts-alpine3.17

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
