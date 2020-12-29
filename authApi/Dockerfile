FROM node
LABEL maintainer="Gonzalo Nahuel Vaca <vacagonzalo@gmail.com>"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6379 8080 27017
CMD ["node", "index.js"]