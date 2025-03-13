# Task 2.1P - SIT323

This document outlines the steps to set up a **Node.js** and **Express** web server using **TypeScript**.  


## Step 1: Initialize the Project
1. Run `npm init -y`
2. Install dependencies:  
```sh
npm install express  
npm install --save-dev typescript ts-node @types/node @types/express
npx tsc --init
```

## Step 2: Create the Server File
1. Create src/server.ts and add server logic.

## Step 3: Create the Public Files
1. Create public/ directory.
2. Add index.html and styles.css inside public/.

## Step 4: Update package.json
Update the script:
```sh
"scripts": {
  "dev": "ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

## Step 5: Run the Server
```sh
npm run dev
```

Open http://localhost:3000/ in a browser.