import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CopyRight from '../CopyRight/CopyRight';
import {ForgotEmailApi } from '../../utils/const.dev';
import { useStyles } from './styles/styles';
import { callSignIn } from './hooks/callSignIn';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [passwordForgotMessage, setPasswordForgotMessage] = useState('Forgot Password ? No worries');
  const [open, setOpen] = React.useState(false);
  const [openOtp, setOpenOtp] = React.useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  
  const handleOpenOtp = () => {
    setOpenOtp(true);
  };
  const handleClosePassword = () => {
    setOpen(false);
  };
  const onForgotPassword = async () => {
    await axios.post(ForgotEmailApi, {
      forgotEmail,
    }).then(() => {
      setPasswordForgotMessage(`Enter the OTP sent to ${forgotEmail}`);
      handleClosePassword();
      handleOpenOtp();
    })
      .catch(() => {
        setResponseMessage('You are not registered with us.');
      });
    // setForgotEmail(response.message);
  };

  const handleOpenPassword = () => {
    setOpen(true);
  };
  const handleCloseOtp = () => {
    setOpenOtp(false);
  };
 
  const onOtpEnter = () => {
    // eslint-disable-next-line
    alert('Hurray');
  };
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root} >
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClosePassword}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={open}>
            <div className={classes.paperModal}>
              <h3 id="transition-modal-title">{passwordForgotMessage}</h3>
              {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
              <form className={classes.root1} autoComplete="off">
                <TextField
                  id='standard-basic'
                  label='Registered Email'
                  type="email"
                  onChange={(e) => setForgotEmail(e.target.value)} /> <br /><br />
                <Button
                  variant='contained'
                  color="primary"
                  disabled={!forgotEmail}
                  onClick={() => onForgotPassword()}
                > Send
                </Button>
                <p className={classes.error}>{responseMessage}</p>
              </form>
            </div>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openOtp}
          onClose={handleCloseOtp}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={openOtp}>
            <div className={classes.paperModal}>
              <h5 id="transition-modal-title">{passwordForgotMessage}</h5>
              {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
              <form className={classes.root1} noValidate autoComplete="off">
                <TextField
                  id='standard-basic'
                  label='Enter OTP'
                // onChange={(e) => setForgotEmail((e.target.value).toLowerCase)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!forgotEmail}
                  onClick={() => onOtpEnter()}
                > Send
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail((e.target.value).toLowerCase())}

            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => 
                (callSignIn(email,password)
                .then((res)=>
                {
                  console.log(res);
                  if(res.status===200) history.push('/home')
                }))}
              disabled={!(email !== '' && password !== '')}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" onClick={handleOpenPassword} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5} className={classes.Box}>
              <CopyRight />
            </Box>
          </form>

        </div>
      </Grid>
    </Grid>
  );
};
export default Login;
