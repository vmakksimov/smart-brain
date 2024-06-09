FROM node

WORKDIR /user/src/smart-brain-api

COPY package*.json ./

COPY client/package*.json client/

RUN npm run install-client --omit=dev

COPY server/package*.json server/

RUN npm run install-server --omit=dev

COPY client/ client/

RUN npm run build --prefix client

COPY server/ server/


USER node

CMD [ "npm", "start", "--prefix", "server" ] 

EXPOSE 8000

# WORKDIR /user/src/smart-brain-api

# COPY ./server ./server

# RUN npm install


# CMD [ "/bin/bash" ]