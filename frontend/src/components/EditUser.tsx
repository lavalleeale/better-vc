import { Card } from "@material-ui/core";

const EditUser = ({ user }: { user: { name: string; nickname: string } }) => <Card className="card">{user.name}</Card>;

export default EditUser;
