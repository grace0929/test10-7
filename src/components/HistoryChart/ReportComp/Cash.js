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
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { CachedSharp } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
}));

export default function Cash({ cash, lastCash }) {
  // const [money, setMoney] = useState(cash)
  // const [lastMoney, setLastMoney] = useState(999);
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            持有現金
          </Typography>
          <Typography color="textPrimary" variant="h6">
            ${cash}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <AttachMoneyIcon />
          </Avatar>
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
          上月底持有現金
        </Typography>
        <Typography style={{ color: "blue" }} variant="caption">
          {lastCash}
        </Typography>
      </Box>
    </>
  );
}
