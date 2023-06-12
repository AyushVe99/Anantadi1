import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [videoFiles, setVideoFiles] = useState([]);
  const [jsonFiles, setJsonFiles] = useState([]);

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    setVideoFiles([...videoFiles, ...files]);
  };

  const handleJsonUpload = (event) => {
    const files = Array.from(event.target.files);
    setJsonFiles([...jsonFiles, ...files]);
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Upload Videos and JSON Objects
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Upload Videos
            </Typography>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoUpload}
            />
            {videoFiles.map((file, index) => (
              <Typography key={index}>{file.name}</Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Upload JSON Objects
            </Typography>
            <input
              type="file"
              accept=".json"
              multiple
              onChange={handleJsonUpload}
            />
            {jsonFiles.map((file, index) => (
              <Typography key={index}>{file.name}</Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Upload
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
