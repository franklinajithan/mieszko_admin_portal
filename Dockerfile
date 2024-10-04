# Build the React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

# Build the app for production
RUN npm run build

# Use nginx to serve the build files
FROM nginx:stable-alpine

# Copy the build output to the nginx web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
