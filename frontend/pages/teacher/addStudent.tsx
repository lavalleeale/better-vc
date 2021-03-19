/* eslint-disable react/require-default-props */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  Button,
  Card,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { FormEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import Popup from 'reactjs-popup';
import { API_BASE_URL } from '../../constants';

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    nickname: '',
    email: '',
  });
  const [image, setImage] = useState('');
  const [cookies] = useCookies(['name']);
  const [showProgress, setShowProgress] = useState(false);

  function validateEmail(inputText: string) {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!inputText.match(mailformat) || inputText === '';
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowProgress(true);
    const response = await Promise.all([
      fetch(`${API_BASE_URL}/teacher/addUser`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          'X-CSRF-TOKEN': cookies.csrf_access_token,
        },
        body: JSON.stringify({
          ...student,
          teacher: false,
          image,
        }),
      }),
      setTimeout(() => {}, 1000),
    ]);
    if (response[0].ok) {
      setStudent({ name: '', nickname: '', email: '' });
      setShowProgress(false);
    }
  }
  return (
    <Card className="card">
      <form onSubmit={onSubmit}>
        <TextField
          id="name"
          required
          className="longText"
          value={student.name}
          onChange={(e) => {
            setStudent({
              ...student,
              name: e.target.value,
            });
          }}
          label="Name"
          variant="outlined"
        />
        <TextField
          id="nickname"
          style={{ marginTop: '15px' }}
          className="longText"
          value={student.nickname}
          onChange={(e) => {
            setStudent({
              ...student,
              nickname: e.target.value,
            });
          }}
          label="Nickname"
          variant="outlined"
        />
        <TextField
          id="email"
          style={{ marginTop: '15px' }}
          required
          error={!validateEmail(student.email)}
          className="longText"
          value={student.email}
          onChange={(e) => {
            setStudent({
              ...student,
              email: e.target.value,
            });
          }}
          label="Email"
          variant="outlined"
        />
        <Button
          aria-label="Add"
          type="submit"
          style={{ float: 'right', marginTop: '10px' }}
          variant="outlined"
        >
          Add
        </Button>
        <label htmlFor="image-upload">
          <Button
            variant="outlined"
            component="span"
            style={{ marginTop: '10px' }}
          >
            Upload Profile Picture
          </Button>
          <input
            style={{ display: 'none' }}
            accept="image/png image/jpeg image/jpg"
            id="image-upload"
            type="file"
            onChange={(e) => {
              const reader = new FileReader();
              if (e.target.files) {
                reader.readAsDataURL(e.target.files[0]);
                reader.addEventListener('load', () => {
                  setImage(reader.result as string);
                });
              }
            }}
          />
        </label>
      </form>
      <Popup
        modal
        closeOnDocumentClick={false}
        closeOnEscape={false}
        open={showProgress}
        onClose={() => setShowProgress(false)}
      >
        <Card
          className="card"
          variant="outlined"
          style={{ textAlign: 'center' }}
        >
          <Typography variant="h3">Creating User...</Typography>
          <LinearProgress
            style={{ marginTop: '10px', width: '500px' }}
          />
        </Card>
      </Popup>
    </Card>
  );
};

export default AddStudent;
