import { Button, Card, Typography } from "@material-ui/core";
import { ClassType } from "../@types/class";

const Class = ({ block, teacher }: { block: ClassType; teacher: boolean }) => {
  function compareTime(startTime: Date, endTime: Date) {
    const currentTime = new Date();
    return (
      removeDate(startTime) <= removeDate(currentTime) &&
      removeDate(currentTime) < removeDate(endTime)
    );
  }
  function removeDate(date: Date) {
    return new Date(
      Date.UTC(0, 0, 0, date.getUTCHours(), date.getUTCMinutes())
    ).getTime();
  }
  return (
    <Card
      className={
        compareTime(new Date(block.startTime), new Date(block.endTime))
          ? "selected"
          : "notSelected"
      }
    >
      {!teacher && (
        <>
          {block.zoomLink ? (
            <a
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "inherit", float: "right" }}
              href={block.zoomLink}
            >
              <Button variant="outlined">Zoom Link</Button>
            </a>
          ) : (
            <Button variant="outlined" disabled style={{ float: "right" }}>
              No Link
            </Button>
          )}
        </>
      )}
      <Typography>Name: {block.name}</Typography>
      <Typography>Teacher: {block.teacher}</Typography>
      <Typography>
        Start Time: {new Date(block.startTime).toLocaleTimeString()}
      </Typography>
      <Typography>
        End Time: {new Date(block.endTime).toLocaleTimeString()}
      </Typography>
      {teacher && <Typography>Zoom Link: {block.zoomLink}</Typography>}
    </Card>
  );
};

export default Class;
