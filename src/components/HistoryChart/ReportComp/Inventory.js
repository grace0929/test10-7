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
import AllInboxIcon from "@material-ui/icons/AllInbox";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
}));

export default function Inventory({ inventory, lastInventory }) {
  //const [Inventory, setInventory] = useState(inventory)
  // const [lastInventory, setLastInventory] = useState(60)
  const classes = useStyles()
  const theme = useTheme()
  return (
    <>
      <Grid container justify="space-between" spacing={3}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            持有存貨
          </Typography>
          <Typography color="textPrimary" variant="h6">
            {inventory}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <AllInboxIcon />
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
          上月底持有存貨
        </Typography>
        <Typography style={{ color: "green" }} variant="caption">
          {lastInventory}
        </Typography>
      </Box>
    </>
  );
}
