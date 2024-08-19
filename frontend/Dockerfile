ARG NODE_VERSION=22.4.0

FROM node:${NODE_VERSION}

WORKDIR /app/frontend

COPY ./frontend .

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
