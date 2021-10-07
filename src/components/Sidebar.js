import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Badge, Hidden, Box, IconButton } from "@material-ui/core";
import { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import Popover from "@material-ui/core/Popover";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink, useHistory, Switch, Route, Redirect } from "react-router-dom";
import routes from "../routes_retailer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userlogout } from "../redux/tokenSlice";
import { setFlow } from "../redux/userSlice";
import { RefreshAuthLogic } from "../refreshAuthLogic";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {
  initiateSocket, disconnectSocket, joinroom, isSocket, getSocket
} from '../socket';
import { setInvoice, setCreditTerms, setPayable, setUnitPrice } from "../redux/invoiceSlice";
import { setDisabled } from "../redux/processSlice";
import { setBargain, setReceipt } from "../redux/processSlice";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  popover: {
    pointerEvents: "none",
    marginLeft: "85%",
    marginTop: "2%",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/retaileradmin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/retaileradmin" to="/retaileradmin/dashboard" />
  </Switch>
);

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.accessToken)
  const { user: { userId, industryId, classroomId, flow } } = useSelector(state => state.user)
  const { pair: { currentTime, pairId, supplierId, retailerId } } = useSelector(state => state.game)
  const instance = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  //auto handle request when accessToken was expired
  const refreshAuthLogic = RefreshAuthLogic();
  createAuthRefreshInterceptor(instance, refreshAuthLogic);
  let history = useHistory();
  const { color, logo, image, logoText, routes } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [notifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const popOpen = Boolean(anchorEl);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function activeRoute(routeName) {
    history.push(routeName);
  }
  const getRoute = () => {
    // alert(window.location.pathname);
    return window.location.pathname;
  };
  const logout = async () => {
    instance
      .post("http://localhost:3300/users/logout")
      .then((res) => {
        // dispatch(setAccessToken(""))
        dispatch(userlogout())
        disconnectSocket()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //取得現金流api...&取得進度api...
  const getData = async () => {
    instance
      .get("http://localhost:3300/flows/me",
    )
      .then(res => {
        dispatch(setFlow(res.data.flow))
      })
      .catch((err) => {
        console.log(err)
      })
  };
  useEffect(() => {
    getData()
    // if (!isSocket()) {
    initiateSocket()
    joinroom(pairId)
    joinroom("class" + classroomId)
    // }

    // return () => {
    //   s.disconnect()
    // }
  }, [])
  useEffect(() => {
    if (!isSocket()) return
    getSocket().on("invoice-retailer", (invoice) => {
      console.log(invoice)
      dispatch(setUnitPrice(invoice.price))
      dispatch(setCreditTerms(invoice.creditTerm))
      // setCreditLine(invoice.creditLine)
      dispatch(setBargain(true))
      console.log("這樣呢")
    })
    getSocket().on("message", (message) => {
      console.log(message)
      if (message === "delivery") {
        dispatch(setReceipt(true))
        dispatch(setDisabled(false))
        console.log("測試")
      }
    })
  }, [])


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Supply-chain&nbsp;&nbsp;&nbsp;&nbsp;
            <MonetizationOnIcon />
            &nbsp;{flow.cash}&nbsp;
            <AccessAlarmsIcon />
            &nbsp;{currentTime}&nbsp;
            {/* 放Naver */}
          </Typography>
          <Box flexGrow={1} />
          <Hidden mdDown>
            <ExitToAppIcon onClick={logout} />
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                />
                <Popover
                  id="mouse-over-popover"
                  open={popOpen}
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                >
                  eMMMMM 有什麼事件
                </Popover>
              </Badge>
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          {routes.map((prop, index) => (
            <NavLink
              to={prop.layout + prop.path}
              activeClassName="active"
              style={{ textDecoration: "None", color: "gray" }}
              key={prop.name}
            >
              <ListItem button key={prop.name}>
                <ListItemIcon>
                  <prop.icon></prop.icon>
                </ListItemIcon>
                <ListItemText primary={prop.name} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* 掛載誒都 Views的component們 詳情請看switchRoutes */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
      </main>
    </div>
  );
}
