# ACCEDOTV exam
Video on Demand Application developed with the Single Page Application and Server Less design patterns using the next technologies:

* [Google Firebase Cloud ( NoSQL Data Base | Hosting | Auth System )](https://firebase.google.com/).
* [Docker](https://www.docker.com/).
* [Angular 2](https://angular.io/).
* [Bootstrap](https://getbootstrap.com/).
* [Videogular](https://videogular.github.io/videogular2/).
* [Github](https://github.com/sandovaledwin)

## Prerequisites

### Install Docker
* [Mac OS X](https://store.docker.com/editions/community/docker-ce-desktop-mac).
* [Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows).

## 1. Download the Angular Docker Image.
This custom Docker Image contains an Angular CLI project running over Docker.  
  ```
docker pull sandovaledwin/angular-cli:1.4.8
  ```

## 2. Clone the project.
After installing the Docker CLI tool, now you're ready to start working with *accedotv* app.

### 2.1 Clone the repository.
  ```
  git clone https://github.com/sandovaledwin/accedotv
  ```

### 2.2 Go into the directory.
  ```
  cd accedotv
  ```
  
## 3. Installing the node modules dependencies.
 ```
docker run -it --rm -w /app -v $(pwd)/myproject:/app sandovaledwin/angular-cli:1.4.8 npm install
  ```

## 4. Running the project.
  ```
docker run -it --rm -w /app -v $(pwd)/myproject:/app -p 4200:4200 sandovaledwin/angular-cli:1.4.8 /home/node/.npm-global/lib/node_modules/@angular/cli/bin/ng serve --host 0.0.0.0
  ``` 
  
## 5. Testing the project.
In order to test that the project is running ok, you'll need to open the next url in the browser.

### 6.1 Open in the Browser the next url.
  ```
  http://localhost:4200
  ```  
