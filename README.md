# Anime tracker

A web app where you can insert the anime you have seen with all the information it needs. You can keep it or delete it if you want to.

I created this project for the Development 5 course for the bachelor degree Multimedia & Creative Technologies

## Getting started

1. Clone the repository using Git: `git clone https://github.com/EHB-MCT/portfolio-starter-AbdellaBoutaarourt`
2. Navigate to the project directory: `cd portfolio-starter-AbdellaBoutaarourt`
3. Build and start the app using Docker Compose: `docker-compose up --build`. It can take around 20-40 seconds to build and the whole project.

## Usage

Use the website by navigating to `http://localhost:5173` in your web browser

## Endpoints

The endpoint are documented in the `./images/api/public/info.html` file.

To acces this file via the browser , you can :

1. Build and start the app using Docker Compose: `docker-compose up --build`
2. Navigate to `http://localhost:80`

## Testing

To launch the testing , you will have to makes a change in the Dockerfile due to some bugs.

1. Navigate to the api directory: `./images/api`
2. Go into the Dockerfile
3. Change the line `CMD ["npm" , "run", "start"]` with `CMD ["npm" , "test"]`
4. Relaunch the app with `docker-compose up --build` if it was launched
5. Once you are done with testing , change the line `CMD ["npm" , "test"]` with `CMD ["npm" , "run", "start"]`

## Dependencies

- Docker

## Resources

- https://docs.docker.com/
- https://www.postman.com/
- http://knexjs.org/
- https://expressjs.com/
- https://jestjs.io/en/

## License

This project is released under the MIT License.

## Contact

Abdella Boutaarourt

abdella.boutaarourt@student.ehb.be

