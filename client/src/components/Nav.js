import React from "react";
import { AppBar, Typography, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  title: {},
  about: {}
}));

function Nav() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h6" className={classes.title}>
              Lytt
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" className={classes.about}>
              About Lytt
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

export default Nav;
