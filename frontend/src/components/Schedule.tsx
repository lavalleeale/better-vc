import ViewClass from "./ViewClass";

const Schedule = () => {
  return (
    <ul>
      {
        /*schedule*/ [].map((block, index) => {
          return (
            <li key={index}>
              <ViewClass teacher={false} block={block} />
            </li>
          );
        })
      }
    </ul>
  );
};

export default Schedule;
