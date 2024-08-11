import React, { Suspense } from 'react';
import { Await, defer, json, Link, useLoaderData } from 'react-router-dom';
import { OrderAPI } from '../../API';

function DetailHistory(props) {
   const { orderDetail } = useLoaderData();

   return (
      <div className="container">
         <section className="py-5 bg-light">
            <div className="container">
               <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                  <div className="col-lg-6">
                     <h1 className="h2 text-uppercase mb-0">Detail Order</h1>
                  </div>
                  <div className="col-lg-6 text-lg-right">
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                           <li className="breadcrumb-item active">Detail</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </section>

         <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={orderDetail}>
               {( { user , customerInfo, totalAmount, items} ) => (
                  <>
                     <div className="p-5">
                        <h1 className="h2 text-uppercase">Information Order</h1>
                        <p>ID User: {user}</p>
                        <p>Full Name: {customerInfo.name}</p>
                        <p>Phone: {customerInfo.phone}</p>
                        <p>Address: {customerInfo.address}</p>
                        <p>Total: {totalAmount}$</p>
                     </div>
                     <div className="table-responsive pt-5 pb-5">
                        <table className="table">
                           <thead className="bg-light">
                              <tr className="text-center">
                                 <th className="border-0" scope="col">
                                    <strong className="text-small text-uppercase">
                                       ID Product
                                    </strong>
                                 </th>
                                 <th className="border-0" scope="col">
                                    <strong className="text-small text-uppercase">Image</strong>
                                 </th>
                                 <th className="border-0" scope="col">
                                    <strong className="text-small text-uppercase">Name</strong>
                                 </th>
                                 <th className="border-0" scope="col">
                                    <strong className="text-small text-uppercase">Price</strong>
                                 </th>
                                 <th className="border-0" scope="col">
                                    <strong className="text-small text-uppercase">Count</strong>
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              { items.map((value) => (
                                    <tr className="text-center" key={value.product._id}>
                                       <td className="align-middle border-0">
                                          <h6 className="mb-0">{value.product._id}</h6>
                                       </td>
                                       <td className="pl-0 border-0">
                                          <div className="media align-items-center justify-content-center">
                                             <Link
                                                className="reset-anchor d-block animsition-link"
                                                to={`/detail/${value.product._id}`}>
                                                <img src={value.product.img1} alt="..." width="200" />
                                             </Link>
                                          </div>
                                       </td>
                                       <td className="align-middle border-0">
                                          <h6 className="mb-0">{value.name}</h6>
                                       </td>
                                       <td className="align-middle border-0">
                                          <h6 className="mb-0">{value.price}</h6>
                                       </td>
                                       <td className="align-middle border-0">
                                          <h6 className="mb-0">{value.quantity}</h6>
                                       </td>
                                    </tr>
                                 ))}
                           </tbody>
                        </table>
                     </div>
                  </>
               )}
            </Await>
         </Suspense>
      </div>
   );
}

export default DetailHistory;

async function loadOrders(id) {
   try {
      const respone = await OrderAPI.getDetail(id);
      console.log(respone.data);
      return respone.data;
   } catch (error) {
      // console.log(error);
      throw json({
         isError: true,
      });
   }
}

export function loader({ params }) {
   const { id } = params;
   return defer({
      orderDetail: loadOrders(id),
   });
}
