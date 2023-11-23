# # First stage - build
# FROM node:latest as build
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# # Second stage - nginx
# FROM nginx:alpine

# COPY --from=node /app/dist/frontend /usr/share/nginx/html

FROM nginx:1.17.1-alpine
COPY /dist/frontend /usr/share/nginx/html