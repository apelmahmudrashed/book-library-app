# Book Library App

### prerequisite
+ NodeJs - v18.16.1 or higher 

Cloone the repository:
```
git clone https://github.com/apelmahmudrashed/book-library-app.git:
```

## Back-end API

### Installation  
1. Install dependencies:
   ```
   cd back-end
   npm install
   ```
3. Run unit test
   ```
   npm test
   ```
2. If default port need to be changed (default port is 3000):
   ```
   set PORT=<port number>
   ```
4. Start the server:
   ```
   node app.js
   ```
5. API document URL:
   ```
   http://localhost:<port number>/api-docs
   ``` 

## Front-end app

### Installation

1. Install dependencies:
   ```
   cd front-end/book-library-app
   npm install
   ```
2. Run unit test
   ```
   npm test
   ```
3. If default port for back-end API need to be changed (default port is 3000):<br>
   Open fornt-end/book-library-app/src/App.tsx file and update the port number in the follwing line. 
   
   ```
   const API_BASE_URL = "http://localhost:<port number>";
   ```
4. Start the server:
   ```
   npm run dev
   ```
