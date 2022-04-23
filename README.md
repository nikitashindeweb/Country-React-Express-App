# Getting Started with Country React / Express App


## Available Scripts for React

In the `app` directory, you can run:

### `npm i install`

Install node dependancies 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Available Scripts for Express

### `npm i install`

Install node dependancies 

### `npm run devstart`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Task

1. Create an Express App which listens on port 8080
2. Create a get API /countries which will provide list of countries [Only name and Id]
available in the data file
3. Create a get API ​/country/{country-id}​ which will return information of that country
based on country id.
4. Create a post API ​/country​ which will accept Country Object and save the details to the
data file and the image to the ​/images​ directory.
Frontend
5. Create a UI
	a. Which shows a dropdown of the current list of countries on load
	b. Changing the value in the drop down should display the details of the current selected country. (Name, Image, Rank)
	c. User should be able to add a new country Name [Validation - Min 3 chars and Max 20]
	d. County Image - Only accept Jpg and Png and Max 4 MB
	e. Continent should be selected from dropdown having unique values from the data
file
	f. Rank should accept only numeric values.
	g. Once successful post, user should be able to see all the updated list of countries
from data file without page refresh
	h. For server side validation. Country Name and Rank must be unique. Highlight
Error fields with Red Border after POST response if any.
