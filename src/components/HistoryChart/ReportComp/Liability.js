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
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.orange[900],
  },
}));

export default function Liability({ liability, lastLiability }) {
  // const [liability, setliability] = useState(liability);
  // const [lastLiability, setLastLiability] = useState(30);
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            本月債務
          </Typography>
          <Typography color="textPrimary" variant="h6">
            ${liability}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <AccountBalanceIcon />
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
          上月持有債務
        </Typography>
        <Typography style={{ color: "orange" }} variant="caption">
          {lastLiability}
        </Typography>
      </Box>
    </>
  );
}
