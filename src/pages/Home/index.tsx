import React from 'react';

import { Button } from 'components/Common';

import styles from './home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.title}>
        <p>
          <span className={styles.highlight}>따</span>
          릉이
        </p>
        <p>
          <span className={styles.highlight}>랜</span>덤
        </p>
        <p>
          <span className={styles.highlight}>디</span>펜스
        </p>
      </div>
      <Button>시작하기</Button>
    </section>
  );
};
export default Home;
