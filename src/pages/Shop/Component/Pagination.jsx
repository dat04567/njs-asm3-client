import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import IndexPage from './IndexPage';

Pagination.propTypes = {
   pagination: PropTypes.object,
   handlerChangePage: PropTypes.func,
   totalPage: PropTypes.number,
};

Pagination.defaultProps = {
   pagination: {},
   handlerChangePage: null,
   totalPage: null,
};

function Pagination({ page, handlerChangePage, totalPage , pagination }) {

   const onDownPage =  useCallback( (value) => {
      if (!handlerChangePage) {
         return;
      }

      const newPage = parseInt(value) - 1;
      handlerChangePage(newPage);
   },[handlerChangePage]);

   const onUpPage = useCallback( (value) => {
      if (!handlerChangePage) {
         return;
      }

      const newPage = parseInt(value) + 1;
      handlerChangePage(newPage);
   }, [handlerChangePage]);

   return (
      <nav aria-label="Page navigation example" className="pt-5">
         <ul className="pagination justify-content-center justify-content-lg-end">
            <li className="page-item">
               <button className="page-link" onClick={() => onDownPage(page)} disabled={page <= 1}>
                  <span>«</span>
               </button>
            </li>

            <IndexPage
               totalPage={totalPage}
               handlerChangePage={handlerChangePage}
               page={page}
            />
            <li className="page-item">
               <button
                  className="page-link"
                  onClick={() => onUpPage(page)}
                  disabled={page >= totalPage}>
                  <span>»</span>
               </button>
            </li>
         </ul>
         <div className="pagination justify-content-center justify-content-lg-end">
            <p className="text-small text-muted mb-0">
               Showing 1–{parseInt(totalPage)} of {parseInt(totalPage) * pagination.count } results
            </p>
         </div>
      </nav>
   );
}

export default Pagination;
