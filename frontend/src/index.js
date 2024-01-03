import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/index.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import store from './store';
// screens
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
// Private screen 4 registered users
import PrivateRoute from './components/PrivateRoute';

// creates routes from elements
const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<App />}>
      // index={true} page
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Private route 4 registered users <Route path='/shipping' element={<ShippingScreen />} />*/}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
      </Route>
    </Route>
     ) );


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* pasiing the storejs as a global prop the app */}
    <Provider store={store}>
      {/* instead of <App /> we can use {router} as a prop --> router={router} /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
