import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { RefreshAuthLogic } from "../../refreshAuthLogic";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useSelector } from "react-redux";
import axios from "axios";
const useStyles = makeStyles({
  root: {},
});

const Setup = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });
  const { accessToken } = useSelector(state => state.accessToken)
  //auto handle request when accessToken was expired
  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  //auto handle request when accessToken was expired
  const refreshAuthLogic = RefreshAuthLogic()
  createAuthRefreshInterceptor(instance, refreshAuthLogic)
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const changePassword = async () => {
    if (values.password === values.confirm) {
      instance
        .patch("http://localhost:3300/users/me", { password: values.password }
        )
        .then(res => {
          alert("成功更新密碼!")
          setValues({
            password: "",
            confirm: "",
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert("新密碼不一致!")
    }
  }
  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Update password" title="密碼設置" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="輸入新密碼"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="再次輸入新密碼"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" onClick={changePassword}>
            更新密碼
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Setup.propTypes = {
  className: PropTypes.string,
};

export default Setup;
