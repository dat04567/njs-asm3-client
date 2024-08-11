import { useCallback } from 'react';
import alertify from 'alertifyjs';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/auth';


const useMessage = () => {
  const dispatch = useDispatch();
  const showMessage = useCallback((error) => {
    alertify.set('notifier', 'position', 'bottom-left');
    if (error?.status === 403 && error?.data.expired) {
      console.log('running');
      console.log(error);
      alertify.error('Phiên Đăng Nhập Hết Hạn, Vui Lòng Đăng Nhập Lại!');
      dispatch(logout());
      return true;
    };
    return false;
  }, [dispatch]);

  return showMessage;
};

export default useMessage;