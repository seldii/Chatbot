import React from "react";
import { Avatar, Grid, Paper } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bot: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },

  human: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
});

const Message = props => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row">
        {props.speaks === "bot" && (
          <Grid item xs={4}>
            <Avatar className={classes.bot}>Lytt</Avatar>
          </Grid>
        )}
        <Grid item xs={8}>
          <Paper style={{ backgroundColor: "lightgrey" }}>{props.text}</Paper>
        </Grid>
        {props.speaks === "me" && (
          <Grid item xs={4}>
            <Avatar className={classes.human}>{props.speaks}</Avatar>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Message;
