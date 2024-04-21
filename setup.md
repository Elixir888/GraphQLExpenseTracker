# Backend Dependencies

```bash
npm init --yes; 
npm install @apollo/server graphql

mkdir src touch src/index.ts

npm i - D typescript;
npx tsc --init
npx tsc
node dist/index.js

npm install prisma @prisma/client mongodb typescript ts-node @types/node --save-dev



npm install express graphql @apollo/server @graphql-tools/merge bcryptjs dotenv 

npm i -D nodemon

npm i graphql-passport passport mongoose express-session connect-mongodb-session
```

# setup package.json
  "scripts": {
    "start": "ts-node backend/index.ts",
    "dev": "nodemon backend/index.ts"
  },

# setup typeDefs & resolvers