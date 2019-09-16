FROM node:current-alpine
MAINTAINER Anthony Rawlins <anthony.rawlins@unimelb.edu.au>

# Make working dir
WORKDIR /usr/src/app

# RUN npm i -g npm

COPY . .
RUN npm install --no-optional

# Deployment
EXPOSE 3035

ENV TZ Australia/Melbourne

CMD ["npm", "run", "reactive"]

