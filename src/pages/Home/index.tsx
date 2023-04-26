import React, { useEffect, useState } from 'react';

import { LightBallIcon } from 'assets';
import axios from 'axios';
import cx from 'clsx';
import { Button } from 'components/Common';
import { BikeData } from 'interface/bikeData.interface';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { randomNumber } from 'utils';
import * as xlsx from 'xlsx';

import styles from './home.module.scss';
import { filterLocation } from './utils';

interface Targets {
  first: string[];
  second: string[];
  third: string[];
}

const Home: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const [data, setData] = useState<[string, string, string]>(['', '', '']);
  const [targets, setTargets] = useState<Targets>({
    first: [],
    second: [],
    third: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isSuccess = Boolean(data) && !isLoading;
  console.log({ isSuccess });
  useQuery(
    ['getExcel'],
    () =>
      axios
        .get(
          'https://kyoongdev-test-bucket.s3.ap-northeast-2.amazonaws.com/defence.xlsx',
          {
            responseType: 'arraybuffer',
          },
        )
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        const excelFile = xlsx.read(data);
        const sheetName = excelFile.SheetNames[0];
        const firstSheet = excelFile.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json<BikeData>(firstSheet, {
          defval: '',
        });

        jsonData
          .map((data) => filterLocation(data.location))
          .forEach((location) =>
            setTargets((prev) => {
              return {
                first: [...prev.first, location[0] ?? ''],
                second: [...prev.second, location[1] ?? ''],
                third: [
                  ...prev.third,
                  location.length > 3
                    ? location.slice(2).join(',')
                    : location[2] ?? '',
                ],
              };
            }),
          );

        const { location: rawLocation } =
          jsonData[randomNumber(0, jsonData.length - 1)];
        const location = filterLocation(rawLocation);
        setData([
          location[0] || '',
          location[1] || '',
          location.length > 3 ? location.slice(2).join(',') : location[2] ?? '',
        ]);
      },
      refetchOnMount: false,
      retry: false,
    },
  );

  const onClickStick = () => {
    if (isActive && isLoading) {
      return;
    }
    if (isActive) {
      setIsLoading(true);
      setIsActive(false);
    } else {
      setIsActive(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2_000);
    }
  };

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
      <div className={styles.rolletWrapper}>
        <div className={styles.top}>
          <LightBallIcon />
          <LightBallIcon />
          <LightBallIcon />
        </div>
        <div className={styles.body}>
          <p>따랜디</p>
          <div
            className={cx(styles.rolesWrapper, {
              [styles.isActive]: isActive && !isSuccess,
            })}
          >
            <div className={styles.role}>
              <div className={styles.container}>
                {isSuccess ? (
                  <p>{data[0]}</p>
                ) : (
                  targets.first.map((text, index) => <p key={index}>{text}</p>)
                )}
              </div>
            </div>
            <div className={styles.role}>
              <div className={styles.container}>
                {isSuccess ? (
                  <p>{data[1]}</p>
                ) : (
                  targets.second.map((text, index) => <p key={index}>{text}</p>)
                )}
              </div>
            </div>
            <div className={styles.role}>
              <div className={styles.container}>
                {isSuccess ? (
                  <p>{data[2]}</p>
                ) : (
                  targets.third.map((text, index) => <p key={index}>{text}</p>)
                )}
              </div>
            </div>
          </div>
          <div
            className={cx(styles.stick, { [styles.isActive]: isActive })}
            onClick={onClickStick}
          >
            <div className={styles.handle} />
          </div>
        </div>
        <div className={styles.bottom} />
      </div>
    </section>
  );
};

export default Home;
