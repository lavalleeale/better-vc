import { Button, Card, IconButton, Typography } from "@material-ui/core";
import { ClassType } from "../@types/class";
import { Edit } from "@material-ui/icons";

const ViewClass = ({
  block,
  teacher,
  setEditing,
}: {
  block: ClassType;
  teacher: boolean;
  setEditing?: (value: boolean) => void;
}) => {
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
              <Button aria-label="Zoom Link" variant="outlined">
                Zoom Link
              </Button>
            </a>
          ) : (
            <Button
              aria-label="no link"
              variant="outlined"
              disabled
              style={{ float: "right" }}
            >
              No Link
            </Button>
          )}
        </>
      )}
      {setEditing && (
        <IconButton
          aria-label="Edit"
          onClick={() => setEditing(true)}
          style={{ float: "right" }}
        >
          <Edit />
        </IconButton>
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

export default ViewClass;
