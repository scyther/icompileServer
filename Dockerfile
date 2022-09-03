FROM node:16.10
ENV NODE_ENV=production

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . /app

# Python Install
RUN apt-get update || : && apt-get install python -y

# C install
RUN apt-get -y install gcc mono-mcs && \
    rm -rf /var/lib/apt/lists/*

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# # Bundle app source


EXPOSE 8000

CMD [ "node", "index.js" ]