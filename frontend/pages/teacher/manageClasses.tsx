/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ClassType } from '../../types/class';
import { API_BASE_URL } from '../../constants';
import EditClass from '../../components/EditClass';
import PageSelect from '../../components/PageSelect';

const ManageClasses = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [cookies] = useCookies();
  const [skip, setSkip] = useState(10);
  const [start, setStart] = useState(0);
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${API_BASE_URL}/teacher/getAllClasses`,
        {
          credentials: 'include',
        },
      );
      setClasses(await response.json());
    }
    getData();
  }, []);
  async function deleteClass(id: number, index: number) {
    await fetch(`${API_BASE_URL}/teacher/deleteClass/${id}`, {
      credentials: 'include',
      method: 'delete',
      headers: {
        'X-CSRF-TOKEN': cookies.csrf_access_token,
      },
    });
    setClasses([...classes.slice(0, index), ...classes.slice(index + 1)]);
  }
  return (
    <div>
      <PageSelect
        skip={skip}
        setSkip={setSkip}
        start={start}
        setStart={setStart}
        end={classes.length}
      />
      <ul>
        {classes
          .slice(start, start + skip)
          .map((block: ClassType, index) => (
            <li key={block.name}>
              <EditClass
                deleteClass={() => deleteClass(block.id!, index)}
                block={block}
                setBlock={(value) => {
                  setClasses([
                    ...classes.slice(0, index + start),
                    value,
                    ...classes.slice(index + start + 1),
                  ]);
                }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ManageClasses;
