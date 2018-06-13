# PKGN Stack (Preact, Koa, GraphQL, Nodejs)
## Purpose
The purpose of this project was to get familiar with different server stack technologies. In this example, I went for a slim and portable model using lighter libraries.

Currently, the app only does user management. I don't know if I plan to do much more with it since it was only an exploration into alternative tooling and/or methodologies.

## Packages
The project utilizes the following packages (some packages not included):
- Preact
- Koa
- Graphql
- Apollo-client
- Jsonwebtoken
- Mongoose
- Passport
- Babel

## Installation

1. Clone the repository
2. ```$ cd PKGN-STACK ```
3. Install dependencies
``` npm install ```
or
``` yarn install ```
4. Start the app
``` npm run dev ```
or
``` yarn dev ```
5. To Build
``` npm run build ```
or
``` yarn build ```

## Configuration
Server configuration is separated for both Client and Server.

### To edit server config
The server config file is located in the ```/server/config/``` folder.
- Paths.js: Used to load file paths to the dev-server
- variables.env: Your environment variables file

### To edit client config
The client config file is located in the ```/client/config/``` folder.
- Paths.js: Used to load file paths to the server
- variables.env: Your environment variables file

