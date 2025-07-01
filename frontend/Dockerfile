# Step 1: Build Angular App
FROM node:22 AS build-dev
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production
 
# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build-dev /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]