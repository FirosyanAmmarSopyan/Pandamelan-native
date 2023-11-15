FROM node:18.12.1

WORKDIR /app

ENV PORT=4001 

ENV NODE_ENV=production 

ENV DATABASE_URL=postgresql://postgres:GfbyJJlThJms0BQ0@db.xlmkcghpxpvmnfsucrie.supabase.co:5432/postgres

COPY package.json package-lock.json /app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD [ "npm", "run", "start" ]