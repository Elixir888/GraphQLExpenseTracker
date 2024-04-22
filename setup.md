# Backend Dependencies

```bash
npm init --yes; 

npm install @apollo/server graphql
npm install @graphql-tools/merge

mkdir src touch src/index.ts

npm install --save-dev typescript @types/node
npm i -D nodemon
```
# touch tsconfig.json
```
{
    "compilerOptions": {
      "rootDirs": ["src"],
      "outDir": "dist",
      "lib": ["es2020"],
      "target": "es2020",
      "module": "esnext",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "verbatimModuleSyntax": false,
      "types": ["node"]
    }
  }
```

# package.json; import file extensions are declared as .js (for not running with webpack)
```
 "type": "module",
  "main": "index.js",
  "scripts": {
    "compile": "tsc -w",
    "start": "npm run compile && node ./dist/index.js",
    "dev": "concurrently \"npm run compile\" \"nodemon ./dist/index.js\""
  },
```

# setup PRISMA
```
npm install prisma typescript ts-node @types/node --save-dev
npx prisma
npx prisma init

npm install @prisma/client
```

# install dependencies
```

npm install express graphql @apollo/server @graphql-tools/merge bcryptjs dotenv 

npm i graphql-passport passport colors cron

```

# setup typeDefs & resolvers