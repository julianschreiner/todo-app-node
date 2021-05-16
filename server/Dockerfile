FROM node:10

COPY ./docker/entrypoint.sh /entrypoint/
RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
EXPOSE 3000

ENTRYPOINT ["/entrypoint/entrypoint.sh"]

CMD [ "npm", "start" ]
