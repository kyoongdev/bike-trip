import React, { useState } from 'react';

import axios from 'axios';
import { Button, Loading } from 'components/Common';
import type { BikeData } from 'interface/bikeData.interface';
import { useNavigate } from 'react-router-dom';
import { randomNumber } from 'utils';
import * as xlsx from 'xlsx';

import styles from './result.module.scss';

const Result: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<BikeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isSuccess = Boolean(data) && isLoading;

  const onGetFile = async () => {
    const response = await axios.get(
      'https://kyoongdev-test-bucket.s3.ap-northeast-2.amazonaws.com/defence.xlsx',
      {
        responseType: 'arraybuffer',
      },
    );
    const excelFile = xlsx.read(response.data);
    const sheetName = excelFile.SheetNames[0];

    const firstSheet = excelFile.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json<BikeData>(firstSheet, {
      defval: '',
    });

    const target = jsonData[randomNumber(0, jsonData.length - 1)];
    setData(target);
  };

  const onClickReset = () => {
    navigate(0);
  };

  React.useEffect(() => {
    onGetFile();
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  }, []);

  if (!isSuccess) {
    return <Loading />;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.result}>
        <h1>오늘의 목적지는?</h1>
        <div className={styles.location}>
          <p>{data?.location}</p>
        </div>
      </div>
      <Button color="secondary" onClick={onClickReset}>
        다시 정하기
      </Button>
    </section>
  );
};
export default Result;
