import React, { Suspense } from 'react';
import {  Await } from 'react-router-dom';
import ListCart from './ListCart';


function TableCart({ onDeleteCart, onUpdateCount, carts }) {


   return (
      <div className="table-responsive mb-4">
         <table className="table">
            <thead className="bg-light">
               <tr className="text-center">
                  <th className="border-0" scope="col">
                     <strong className="text-small text-uppercase">Image</strong>
                  </th>
                  <th className="border-0" scope="col">
                     <strong className="text-small text-uppercase">Product</strong>
                  </th>
                  <th className="border-0" scope="col">
                     <strong className="text-small text-uppercase">Price</strong>
                  </th>
                  <th className="border-0" scope="col">
                     <strong className="text-small text-uppercase">Quantity</strong>
                  </th>
                  <th className="border-0" scope="col">
                     <strong className="text-small text-uppercase">Total</strong>
                  </th>
                  <th className="border-0" scope="col">
                     <strong className="text-small text-uppercase">Remove</strong>
                  </th>
               </tr>
            </thead>
            <tbody>
               <Suspense
                  fallback={
                     <tr>
                        <td>Loading...</td>
                     </tr>
                  }>
                  <Await resolve={carts}>
                     {(data) => {
                        if (data.carts.length === 0) {
                           return <tr>Không có sản phẩm trong giỏ hàng hoặc giỏ hàng đã xoá do thời gian đã hết </tr>;
                        }
                        return (
                           <ListCart
                              carts={data.carts}
                              onDeleteCart={onDeleteCart}
                              onUpdateCount={onUpdateCount}
                           />
                        );
                     }}
                  </Await>
               </Suspense>
            </tbody>
         </table>
      </div>
   );
}

export default TableCart;
