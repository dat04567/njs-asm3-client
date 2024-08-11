import React from 'react';
import convertMoney from '../../../convertMoney';
function TotalCart({ total }) {
   
   return (
      <ul className="list-unstyled mb-0">
         <li className="d-flex align-items-center justify-content-between">
            <strong className="text-uppercase small font-weight-bold">Subtotal</strong>
            <span className="text-muted small">{convertMoney(total)} VND</span>
         </li>
         <li className="border-bottom my-2"></li>
         <li className="d-flex align-items-center justify-content-between mb-4">
            <strong className="text-uppercase small font-weight-bold">Total</strong>
            <span>{convertMoney(total)} VND</span>
         </li>
      </ul>
   );
}

export default TotalCart;
