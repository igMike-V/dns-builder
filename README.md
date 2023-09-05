<a name="readme-top"></a>
# DNS Record Helper
#### Video Demo:  https://youtu.be/WzDqM3xtUbQ
#### Description

This project aims to build a simple interface to provide DNS entry values and check connection status for domains. DNS Record builder allows logged in users to create: `Records`, `Sites`, and `Record` `Templates`.  Sites can have any number of `Records` or `Templates` that can be connected by a logged in user. The software allows non logged in users to view `Sites` along with the associated `Records` and `Templates` via a link created by a logged in user.  Since DNS records are public there is no pressing need to provide any sort of token or cookie authentication to simply view records, therefore site lookup is done via url parameters.

NOTE: as of version 1.0.0 Templates is not yet functional.


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#frontend-structure">Frontend Structure</a></li>
        <li><a href="#backend-structure">Backend Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Frontend Structure
The frontend (created with VITE) of the application's src is orgainzed into a root directory containing the main entry point of the application ( main.jsx )
the main component contains all the routing information along with the reactDOM createRoot function that wraps the router in any needed contexts.  

The '/' route for the project loads the Root element that contains the header and loads additional components via the ReactRouter 'Outlet'

Further Components are organized as follows:
- A main component directory containing general views including login, header and error pages.
- Folders for each View Component.  Each folder contains an index (main component) and any additional components that load only in that view
- A 'Shared' components folder.  This folder contains elements that are used in multiple places and React context file
- Within the Shared folder there is a folder for Form specific components including validation.
- A styles folder to allow reuse of tailwind styles

The Frontend relies on an API, Axios is used to add, remove, and edit records. all axios calls can be found in the 'services' folder.  in order to make sure that axios always sends the headers and credentials with each call there is a file within that initializes and exposes the pre created axios object named axios.jsx

A utilities folder that contains URLS needed for development and deployment 

### Backend Structure

The Backend (node.js, express.js, sequelize) of the application is initiated in the file ‘server.js’ and organized into the following folders:

Controllers:
This folder contains all the code to handle the api endpoints. Each file other then index.js  contains a single endpoint controller.  To simplify the building of routes the index.js file contains  references to each route and exports an object containing a string representing the endpoint, the referenced route (router) and an optional array of middleware to apply to the entire route.

Middleware:
This folder contains express middleware to handle the following functionality:
AuthHandler (stops access to endpoint when user session is not present –see SessionExtractor middleware which must precede this middleware)
SessionExtractor (checks for authorized http cookie in header - sent from request.
ErrorHandler(catches errors and can be used for logging.)
DemoLock (temporary middleware for MVP of application.  Used to secure the user route so only the automatically created user is accessible.)

Migrations:
This folder contains all the migration scripts to create database tables and some rows. Migrations table is automatically checked against the files in this directory everytime the database connection is initialized  a migrator.js script is available in the root directory to allow manual migration and rollback.

Models:
This folder contains all the database models needed for sequelize to interact with the database. 

Requests:
This folder contains sample requests that can be used with VS plugin “REST Client” 

Util:
This folder contains a config file that loads all environment variables, a file that initializes Sequelize and connects to the database, and the session service for setting and destroying sessions from the session table.

Finally for ease of development there is a docker-comose.yml and Dockerfile to create a local dockerized MariaDB.


<!-- GETTING STARTED -->
## Getting Started

This project is organized as a MonoRepo.  The frontend and backend are located in their respective directories under the root directory of the repository.

### Prerequisites

Database for development is included in a docker-compose file found in the main directory.  you will need to have docker installed on your machine or an external MariaDB that you can connect to for development.  We will only be discussing the included docker image from here on out, however configuring an external database can be done by updating environment variables from a .env file in the server directory.

#### Sample .env
```
DATABASE_URL=localhost
DB_PORT=3306
DB_NAME=dns-helper
DB_USER=user
DB_PASSWORD=password
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Installation

Clone the repo
   ```sh
   git clone https://github.com/igMike-V/dns-builder.git
   ```
#### Server

Navigate to "server" directory
   
1. Install NPM packages
   ```sh
   npm install
   ```
2. Compose Docker MariaDB
   ```sh
   docker-compose up
   ```
3. Create .env file (see example above for dev environment)

4. Run Server (Database tables will be built via migration on first run)
```sh
  npm run dev
```

#### Frontend
Navigate to the "frontend" directory

1. Install NPM packages
   ```sh
   npm install
   ```

2. Run in dev mode (VITE)
   ```sh
   npm run dev
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [✔️] Store data to a database
- [✔️] form validation
- [✔️] Custom records per domain
- [✔️] Public facing page that retrieves the site with records
- [✔️] add estimation of TTL and testing of dns A records
- [ ] DNS LOOKUPS (additional lookups)
- [ ] User management
- [ ] SPF builder (for clients with multiple SPF records)
- [ ] connect registrar APIs for one-click updates.

See the [open issues](https://github.com/igMike-V/dns-builder/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License
Copyright © Michael Vautour
Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mike Vautour - [@iglab_dev](https://twitter.com/iglab_dev)

Project Link: [https://github.com/igMike-V/dns-builder](https://github.com/igMike-V/dns-builder)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
Read me template based on https://github.com/othneildrew/Best-README-Template by othneildrew

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/igMike-V/dns-builder.svg?style=for-the-badge
[license-url]: https://github.com/igMike-V/dns-builder/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/mikevautour
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
