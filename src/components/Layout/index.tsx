import React from 'react';

import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import styles from './layout.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
