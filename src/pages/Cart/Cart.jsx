import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TableCart from './components/TableCart';
import { defer, json, Link, Navigate, useLoaderData } from 'react-router-dom';
import { CartAPI } from '../../API';
import TotalCart from './components/TotalCart';
import alertify from 'alertifyjs';

function Cart(props) {
   const { isLoggedIn } = useSelector((state) => state.auth);
   const { carts } = useLoaderData();
   const [price, setPrime] = useState(0);

   useEffect(() => {
      async function fetch() {
         try {
            const data = await carts;
            setPrime(data.total);
         } catch (error) {
            console.log(error);
         }
      }
      fetch();
   }, [carts]);

   const handleError = (error, callback) => {
      if(error.data.message)
      {
         callback({
            expired : true
         }); 
         setPrime(0); 
      } else if (error.status === 404 && error.data) {
         const { carts, total } = error.data;
         alertify.alert("Thông báo", `Mặt hàng này đã hết thời gian để lưu vào giỏ hàng.`);
       
         callback(carts);
         setPrime(total);
      } 
   };

   const onUpdateCount = useCallback((getProduct, getCount, callback) => {
      const fetchPut = async () => {
         const params = {
            idProduct: getProduct,
            count: getCount,
         };
         try {
            const response = await CartAPI.patchToCart(params);
            const { carts, total } = response.data;
            console.log(response.data);
            alertify.set('notifier', 'position', 'top-bottom');
            alertify.success('Cập nhật giỏ hàng thành công');
            setPrime(total);
            callback(carts);
         } catch (error) {
            handleError(error, callback);
         }
      };
      fetchPut();
   }, []);

   //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha
   const onDeleteCart = async (getProduct, callback) => {
      try {
         const response = await CartAPI.deleteToCart(getProduct);
         const { carts, total } = response.data;
         alertify.set('notifier', 'position', 'top-bottom');
         alertify.success('Xoá mặt hàng thành công');
         setPrime(total);
         callback(carts);  
      } catch (error) {
         handleError(error, callback);
      }
   };

   if (!isLoggedIn) {
      return <Navigate to={'/signin'} />;
   }

   return (
      <div className="container">
         <section className="py-5 bg-light">
            <div className="container">
               <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                  <div className="col-lg-6">
                     <h1 className="h2 text-uppercase mb-0">Cart</h1>
                  </div>
                  <div className="col-lg-6 text-lg-right">
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                           <li className="breadcrumb-item active" aria-current="page">
                              Cart
                           </li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </section>
         <section className="py-5">
            <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
            <div className="row">
               <div className="col-lg-8 mb-4 mb-lg-0">
                  <TableCart
                     onUpdateCount={onUpdateCount}
                     onDeleteCart={onDeleteCart}
                     carts={carts}
                  />

                  <div className="bg-light px-4 py-3">
                     <div className="row align-items-center text-center">
                        <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                           <Link className="btn btn-link p-0 text-dark btn-sm" to={`/shop`}>
                              <i className="fas fa-long-arrow-alt-left mr-2"> </i>
                              Continue shopping
                           </Link>
                        </div>
                        <Link className="col-md-6 text-md-right" to="/checkout">
                           <span className="btn btn-outline-dark btn-sm" >
                              Proceed to checkout
                              <i className="fas fa-long-arrow-alt-right ml-2"></i>
                           </span>
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4">
                  <div className="card border-0 rounded-0 p-lg-4 bg-light">
                     <div className="card-body">
                        <h5 className="text-uppercase mb-4">Cart total</h5>
                        <TotalCart total={price} />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

async function loadCarts() {
   try {
      const respone = await CartAPI.getCarts();
      return respone.data;
   } catch (error) {
      // console.log(error);
      throw json({
         isError: true,
      });
   }
}

export function loader() {
   return defer({
      carts: loadCarts(),
   });
}

export default Cart;
