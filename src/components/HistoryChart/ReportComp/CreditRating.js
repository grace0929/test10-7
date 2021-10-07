import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
}));

export default function CreditRating({ creditRating, lastCreditRating }) {
  //const [level, setLevel] = useState(creditRating);
  // const [lastLevel, setLastLevel] = useState("中");
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            本月信用等級
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>{creditRating}</Avatar>
        </Grid>
      </Grid>
      <Box
        mt={2}
        display="flex"
        alignItems="center"
      // style={{ border: "2px solid black" }}
      >
        <Typography
          style={{ paddingRight: "2px" }}
          color="textSecondary"
          variant="caption"
        >
          上月信用等級
        </Typography>
        <Typography style={{ color: "red" }} variant="caption">
          {lastCreditRating}
        </Typography>
      </Box>
    </>
  );
}
