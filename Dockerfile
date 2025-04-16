FROM node:18-alpine AS build-deps

ENV NODE_ENV production
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
ENV NODE_ENV production 
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
