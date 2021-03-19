/* eslint-disable react/require-default-props */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Card, IconButton, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const User = ({
  userProp,
  deleteUser,
}: {
    userProp: {
        name: string;
        nickname: string;
        email: string;
        teacher: boolean;
        // eslint-disable-next-line camelcase
        image_url: string;
    };
    deleteUser?(): void;
}) => (
  <Card className="card">
    {userProp.image_url && (
    <img
      style={{ width: '100px', height: '100px', float: 'right' }}
      alt="profile"
      src={userProp.image_url}
    />
    )}
    {deleteUser && (
    <IconButton
      aria-label="Delete User"
      style={{ float: 'right' }}
      onClick={deleteUser}
    >
      <Delete />
    </IconButton>
    )}
    <Typography>
      Role:
      {' '}
      {userProp.teacher ? 'Teacher' : 'Student'}
    </Typography>
    <Typography>
      Name:
      {' '}
      {userProp.name}
      {' '}
      (
      {userProp.nickname}
      )
    </Typography>
    <Typography>
      Email:
      {' '}
      <a color="" href={`mailto:${userProp.email}`}>
        {userProp.email}
      </a>
    </Typography>
  </Card>
);

export default User;
