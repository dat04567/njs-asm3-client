import React, { Suspense, useEffect, useState } from 'react';
import convertMoney from '../../convertMoney';
import './Checkout.css';
import { Await, Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import { OrderAPI } from '../../API';
import { useSelector } from 'react-redux';

function Checkout(props) {
   const { isLoggedIn } = useSelector((state) => state.auth);
   const navigate  = useNavigate();
   const [total, setTotal] = useState(0);

   const [fullname, setFullname] = useState('');
   const [fullnameError, setFullnameError] = useState(false);

   const [email, setEmail] = useState('');
   const [emailError, setEmailError] = useState(false);

   const [emailRegex, setEmailRegex] = useState(false);

   const [phone, setPhone] = useState('');
   const [phoneError, setPhoneError] = useState(false);

   const [address, setAddress] = useState('');
   const [addressError, setAddressError] = useState(false);

   const [success, setSuccess] = useState(false);

   const [load, setLoad] = useState(false);
   const { carts } = useLoaderData();

   useEffect(() => {
      async function fetch() {
         try {
            const data = await carts;
            setTotal(data.total);
         } catch (error) {
            console.log(error);
         }
      }
      fetch();
   }, [carts]);

   //Check Validation
   const handlerSubmit = async (event) => {
      event.preventDefault();
      if (!fullname) {
         setFullnameError(true);
         setEmailError(false);
         setPhoneError(false);
         setAddressError(false);
         return;
      } else {
         if (!email) {
            setFullnameError(false);
            setEmailError(true);
            setPhoneError(false);
            setAddressError(false);
            return;
         } else {
            setPhoneError(false);
            setAddressError(false);
            setFullnameError(false);

            if (!validateEmail(email)) {
               setEmailRegex(true);
               setFullnameError(false);
               setEmailError(false);
               setPhoneError(false);
               setAddressError(false);
               return;
            } else {
               setEmailRegex(false);

               if (!phone) {
                  setFullnameError(false);
                  setEmailError(false);
                  setPhoneError(true);
                  setAddressError(false);
                  return;
               } else {
                  setFullnameError(false);
                  setEmailError(false);
                  setPhoneError(false);
                  setAddressError(false);

                  if (!address) {
                     setFullnameError(false);
                     setEmailError(false);
                     setPhoneError(false);
                     setAddressError(true);
                  } else {
                     setLoad(true);
                     try {
                        const params = {
                           name: fullname,
                           email,
                           phone,
                           address,
                        };
                        await OrderAPI.postOrder(params);
                        setLoad(false);
                        setSuccess(true);

                     } catch (error) {
                        setLoad(false);
                        setSuccess(false);
                        if (error.status === 404) {

                           alertify.alert(
                              'Thông báo',
                              'Giỏ hàng của bạn đã hết thời gian để lưu vào giỏ hàng. Vui lòng thêm lại sản phẩm vào giỏ hàng'
                           );
                           navigate('/shop');
                        }
                     }
                  }
               }
            }
         }
      }
   };

   const onChangeName = (e) => {
      setFullname(e.target.value);
   };

   const onChangeEmail = (e) => {
      setEmail(e.target.value);
   };

   const onChangePhone = (e) => {
      setPhone(e.target.value);
   };

   const onChangeAddress = (e) => {
      setAddress(e.target.value);
   };

   function validateEmail(email) {
      const re =
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
   }

   if (!isLoggedIn) {
      return <Navigate to={'/signin'} />;
   }

   return (
      <div>
         {load && (
            <div className="wrapper_loader">
               <div className="loader"></div>
            </div>
         )}

         <div className="container">
            <section className="py-5 bg-light">
               <div className="container">
                  <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                     <div className="col-lg-6">
                        <h1 className="h2 text-uppercase mb-0">Checkout</h1>
                     </div>
                     <div className="col-lg-6 text-lg-right">
                        <nav aria-label="breadcrumb">
                           <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                              <li className="breadcrumb-item">
                                 <a href="index.html">Home</a>
                              </li>
                              <li className="breadcrumb-item">
                                 <a href="cart.html">Cart</a>
                              </li>
                              <li className="breadcrumb-item active" aria-current="page">
                                 Checkout
                              </li>
                           </ol>
                        </nav>
                     </div>
                  </div>
               </div>
            </section>

            {!success && (
               <section className="py-5">
                  <h2 className="h5 text-uppercase mb-4">Billing details</h2>
                  <div className="row">
                     <div className="col-lg-8">
                        <form>
                           <div className="row">
                              <div className="col-lg-12 form-group">
                                 <label className="text-small text-uppercase" htmlFor="Fullname">
                                    Full Name:
                                 </label>
                                 <input
                                    className="form-control form-control-lg"
                                    value={fullname}
                                    onChange={onChangeName}
                                    type="text"
                                    placeholder="Enter Your Full Name Here!"
                                 />
                                 {fullnameError && (
                                    <span className="text-danger">
                                       * Please Check Your Full Name!
                                    </span>
                                 )}
                              </div>
                              <div className="col-lg-12 form-group">
                                 <label className="text-small text-uppercase" htmlFor="Email">
                                    Email:{' '}
                                 </label>
                                 <input
                                    className="form-control form-control-lg"
                                    value={email}
                                    onChange={onChangeEmail}
                                    type="text"
                                    placeholder="Enter Your Email Here!"
                                 />
                                 {emailError && (
                                    <span className="text-danger">* Please Check Your Email!</span>
                                 )}
                                 {emailRegex && (
                                    <span className="text-danger">* Incorrect Email Format</span>
                                 )}
                              </div>
                              <div className="col-lg-12 form-group">
                                 <label className="text-small text-uppercase" htmlFor="Phone">
                                    Phone Number:{' '}
                                 </label>
                                 <input
                                    className="form-control form-control-lg"
                                    value={phone}
                                    onChange={onChangePhone}
                                    type="text"
                                    placeholder="Enter Your Phone Number Here!"
                                 />
                                 {phoneError && (
                                    <span className="text-danger">
                                       * Please Check Your Phone Number!
                                    </span>
                                 )}
                              </div>
                              <div className="col-lg-12 form-group">
                                 <label className="text-small text-uppercase" htmlFor="Address">
                                    Address:{' '}
                                 </label>
                                 <input
                                    className="form-control form-control-lg"
                                    value={address}
                                    onChange={onChangeAddress}
                                    type="text"
                                    placeholder="Enter Your Address Here!"
                                 />
                                 {addressError && (
                                    <span className="text-danger">
                                       * Please Check Your Address!
                                    </span>
                                 )}
                              </div>
                              <div className="col-lg-12 form-group">
                                 <a
                                    href='/#'
                                    className="btn btn-dark"
                                    style={{ color: 'white' }}
                                    type="submit"
                                    onClick={handlerSubmit}>
                                    Place order
                                 </a>
                              </div>
                           </div>
                        </form>
                     </div>
                     <div className="col-lg-4">
                        <div className="card border-0 rounded-0 p-lg-4 bg-light">
                           <div className="card-body">
                              <h5 className="text-uppercase mb-4">Your order</h5>
                              <ul className="list-unstyled mb-0">
                                 <Suspense fallback={<div>Loading...</div>}>
                                    <Await resolve={carts}>
                                       {({ carts }) => {
                                          if (carts.length === 0) {
                                             alertify.alert(
                                                'Thông báo',
                                                'Giỏ hàng của bạn đang trống'
                                             );
                                             return <Navigate to={'/shop'} />;
                                          }
                                          return carts.map((value) => (
                                             <div key={value._id}>
                                                <li className="d-flex align-items-center justify-content-between">
                                                   <strong className="small font-weight-bold">
                                                      {value.nameProduct}
                                                   </strong>
                                                   <br></br>
                                                   <span className="text-muted small">
                                                      {convertMoney(value.priceProduct)}
                                                      VND x {value.count}
                                                   </span>
                                                </li>
                                                <li className="border-bottom my-2"></li>
                                             </div>
                                          ));
                                       }}
                                    </Await>
                                 </Suspense>

                                 <li className="d-flex align-items-center justify-content-between">
                                    <strong className="text-uppercase small font-weight-bold">
                                       Total
                                    </strong>
                                    <span>{convertMoney(total)} VND</span>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            )}

            {success && (
               <section className="py-5">
                  <div className="p-5">
                     <h1>You Have Successfully Ordered!</h1>
                     <p style={{ fontSize: '1.2rem' }}>Please Check Your Email.</p>
                  </div>
               </section>
            )}
         </div>
      </div>
   );
}

export default Checkout;
