
FROM node:20-alpine

ENV NODE_ENV=development

WORKDIR /app

# RUN npm install -g pnpm

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
