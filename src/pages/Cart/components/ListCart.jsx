import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import convertMoney from '../../../convertMoney';
import imageService from '../../../service/image.service';


function ListCart({ carts , onUpdateCount , onDeleteCart}) {
   const [listCarts, setCarts] = useState(carts);



   
   const handlerChangeText = (e) => {
      console.log(e.target.value);
   };

   const handlerDelete = (getProduct) => {
      if (!onDeleteCart) {
         return;
      }

      onDeleteCart(getProduct, setCarts);
   };

   const handlerDown = (getIdProduct, getCount) => {
      if (!onUpdateCount) {
         return;
      }

      if (getCount === 1) {
         return;
      }
      //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
      const updateCount = parseInt(getCount) - 1;
      onUpdateCount(getIdProduct, updateCount, setCarts);

   };

   const handlerUp = (getIdProduct, getCount) => {
      if (!onUpdateCount) {
         return;
      }

      //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
      const updateCount = parseInt(getCount) + 1;
      onUpdateCount(getIdProduct, updateCount, setCarts);

   };

   console.log(JSON.stringify(listCarts));
   if(listCarts?.expired) {
      return <tr>Thời gian ở trong giỏ hàng đã hết vui lòng thêm vào sản phẩm mới</tr>
   }

   if (listCarts?.length === 0) {
      return <tr>Vui lòng thêm sản phẩm vào giỏ hàng</tr>;
   }
   

   return listCarts.map((value) => (
      <tr className="text-center" key={value.idProduct}>
         <td className="pl-0 border-0">
            <div className="media align-items-center justify-content-center">
               <Link
                  className="reset-anchor d-block animsition-link"
                  to={`/detail/${value.idProduct}`}>
                  <img src={imageService.addHttpsIfNeeded(value.img) } alt="..." width="70" />
               </Link>
            </div>
         </td>
         <td className="align-middle border-0">
            <div className="media align-items-center justify-content-center">
               <Link className="reset-anchor h6 animsition-link" to={`/detail/${value.idProduct}`}>
                  {value.nameProduct}
               </Link>
            </div>
         </td>
         <td className="align-middle border-0">
            <p className="mb-0 small">{convertMoney(value.priceProduct)} VND</p>
         </td>
         <td className="align-middle border-0">
            <div className="quantity justify-content-center">
               <button
                  className="dec-btn p-0"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlerDown(value.idProduct, value.count)}>
                  <i className="fas fa-caret-left"></i>
               </button>
               <input
                  className="form-control form-control-sm border-0 shadow-0 p-0"
                  type="text"
                  value={value.count}
                  onChange={handlerChangeText}
               />
               <button
                  className="inc-btn p-0"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlerUp(value.idProduct, value.count)}>
                  <i className="fas fa-caret-right"></i>
               </button>
            </div>
         </td>
         <td className="align-middle border-0">
            <p className="mb-0 small">
               {convertMoney(parseInt(value.priceProduct) * parseInt(value.count))}
               VND
            </p>
         </td>
         <td className="align-middle border-0">
            <p
               className="reset-anchor remove_cart"
               style={{ cursor: 'pointer' }}
               onClick={() => handlerDelete(value.idProduct)}
              >
               <i className="fas fa-trash-alt small text-muted"></i>
            </p>
         </td>
      </tr>
   ));
}

export default ListCart;
