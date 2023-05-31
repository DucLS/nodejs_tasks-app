FROM node:lts-hydrogen

ARG USER_ID
ARG GROUP_ID

RUN userdel -f node &&\
    groupadd -g ${GROUP_ID} node &&\
    useradd -l -u ${USER_ID} -g node node &&\
    install -d -m 0755 -o node -g node /home/node &&\
    chown --changes --silent --no-dereference --recursive \
          --from=1000:1000 ${USER_ID}:${GROUP_ID} /home/node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
