FROM node:20-slim

WORKDIR /app

# Copy manifest first for better layer caching
COPY package.json ./

# Remove any lockfile to force npm to resolve platform-specific optional
# dependencies (e.g. @rolldown/binding-linux-x64-gnu) fresh for linux.
RUN npm install

# Copy the rest of the source
COPY . .

# Build the Vite app
RUN npm run build

ENV NODE_ENV=production

# serve is a dependency; bind to Railway's dynamic PORT
CMD ["sh", "-c", "npx serve -s dist -l ${PORT:-3000}"]
