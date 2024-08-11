import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer,Chat ,Header } from '../../components';
const Root = () => {
   return (
      <>
         <Header />
         <Outlet />
         <Chat />
         <Footer />
      </>
   );
};

export default Root;
