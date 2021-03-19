/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';
import { fetcher } from '../constants';
import { ClassType } from '../types/class';
import ViewClass from '../components/ViewClass';
import DayPicker from '../components/DayPicker';

const ManageClasses = () => {
  const [cookies] = useCookies(['name']);
  const [day, setDay] = useState(new Date().getDay());
  const { data, error } = useSWR(
    cookies.teacher ? 'teacher/getClasses' : 'user/getClasses',
    fetcher,
  );
  if (error) return <p>Failed To Load</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <DayPicker day={day} setDay={(value: number) => setDay(value)} />
      <ul>
        {data.map((block: ClassType) => (
          <li key={block.name}>
            <ViewClass day={day} teacher={false} block={block} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageClasses;
