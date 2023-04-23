import React from 'react';

// import data from 'data/defence.xlsx';
import axios from 'axios';
import * as xlsx from 'xlsx';

import styles from './result.module.scss';

const Result: React.FC = () => {
  const [file, setFile] = React.useState<any>();

  const onGetFile = async () => {
    const req = new XMLHttpRequest();
    req.open(
      'GET',
      'https://sgp1.vultrobjects.com/kyoongdev-blog/images/defence.xlsx',
      true,
    );
    req.responseType = 'arraybuffer';

    req.onload = function (e) {
      console.log(e);
      const data = new Uint8Array(req.response);

      /* DO SOMETHING WITH workbook HERE */
    };
    req.send();
    // console.log(response);
  };

  React.useEffect(() => {
    onGetFile();
  }, []);

  return (
    <section className={styles.wrapper}>
      <p></p>
    </section>
  );
};
export default Result;
