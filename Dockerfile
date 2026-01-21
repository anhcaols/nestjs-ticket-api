FROM node:24-alpine as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . . 

RUN npm run build
 
# production stage
FROM node:24-alpine as prod-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]



