import { Outlet } from 'react-router-dom';

import Announcement from './Announcement';
import Darkmode from './DarkMode';
import ScrollToTop from './ScrollToTop';

import Navbar from './navbar/Navbar';
import Submenu from './submenu/Submenu';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';

import ModalProvider from '../providers/ModalProvider';
import ToastProvider from '../providers/ToastProvider';

const SharedLayout = () => {
  return (
    <div className='container'>
      <Announcement />
      <Navbar />
      <ToastProvider />
      <Submenu />
      <Sidebar />
      <ModalProvider />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <Darkmode />
    </div>
  );
};

export default SharedLayout;
