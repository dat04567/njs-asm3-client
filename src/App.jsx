import './App.css';
import './css/custom.css';
import './css/style.default.css';
import React from 'react';
import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
} from 'react-router-dom';
import {
   Root,
   Home,
   SignIn,
   SignUp,
   loader as loadCarts,
   Cart,
   Detail,
   Shop,
   Checkout,
   History,
   DetailHistory,
   loaderHistory,
   loaderDetailOrder,
} from './pages';

const RoutesJSX = (
   <Route path="/" element={<Root />}>
      <Route index path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} loader={loadCarts} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/checkout" element={<Checkout />} loader={loadCarts} />
      <Route path="/history" element={<History />} loader={loaderHistory} />
      <Route path="/history/:id" element={<DetailHistory />} loader={loaderDetailOrder} />
      
   </Route>
);

const routes = createRoutesFromElements(RoutesJSX);

const router = createBrowserRouter(routes);

function App() {
   return (
      <RouterProvider router={router} />
   );
}

export default App;
