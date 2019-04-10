FROM node:8.9-alpine
WORKDIR /usr/src/app
COPY /dist/tasks-for-summer /usr/src/app
RUN npm i -g http-server
EXPOSE 3000
CMD ["http-server", "-p 3000"]
