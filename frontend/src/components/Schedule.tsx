import Class from "./Class";

const Schedule = () => {
  return (
    <ul>
      {
        /*schedule*/ [].map((block, index) => {
          return (
            <li key={index}>
              <Class teacher={false} block={block} />
            </li>
          );
        })
      }
    </ul>
  );
};

export default Schedule;
