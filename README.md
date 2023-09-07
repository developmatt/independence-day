# Independence Day


## Installing / Getting started

After cloning this project, you must run two commands:

```shell
yarn
yarn dev
```
Then, you can go to http://localhost:5173/ and see the website.

## Developing

### Built With
It was built using Vite (to create the boilerplate), React, Sass, CSS, JSX.
Those are the main technologies.
I added more packages to speed up the development process and offer a good experience:
 - React Router - controls the routes
 - React Query - to control the important requests and caching data
 - Axios - to the external requests
 - React Hook Form - to control and validate form fields
 - React Icons - Icons library 

### Testing
I added end-to-end tests scripts that automatize the testing process.
This can be done by one of the following commands

```shell
yarn run cypress //runs all the cypress tests is terminal
yarn run cypress:open //opens the cypress interface and let you select the tests you want to follow
```
