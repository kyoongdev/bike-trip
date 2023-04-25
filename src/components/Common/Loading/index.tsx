import React from 'react';

import styles from './loading.module.scss';

const Loading: React.FC = () => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.spinner} />
      </div>
      <p>목적지를 정하는 중입니다.</p>
    </article>
  );
};
export default Loading;
