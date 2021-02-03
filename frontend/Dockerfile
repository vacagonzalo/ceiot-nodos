FROM node as builder
WORKDIR /src/app
COPY . ./
RUN npm install
RUN npm run ng build  --prod

FROM nginx
COPY --from=builder /src/app/dist/frontend /usr/share/nginx/html