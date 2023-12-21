# Getting Started React App with Windows Auth

The project primarily makes a request to the specified API endpoint (such as 'api/auth'), using Windows user information for authentication through backend operations, returning a JWT Token. Subsequently, this token, held within the state, enables access to other methods through a method derived from Axios named 'axiosPrivate.' 
## Sample Usage
The sample usage code for a method expecting a JWT Token is as follows:

```javascript
const response = await axiosPrivate.get('/users', {
    signal: controller.signal
});
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


