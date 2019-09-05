import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    height: "300px",
    width: "300px",
    float: "right"
  },
  messages: {
    height: "200v",
    width: "200v",
    overflow: "auto"
  },
  title: {
    color: theme.palette.secondary.main
  }
});

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.message);
  }

  testQuery() {}
  eventQuery() {}
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <div className={classes.messages}>
          <h2 className={classes.title}>Lytt</h2>
          <form id="message">
            <TextField
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.onChange}
            ></TextField>
            <Button form="message">SEND</Button>{" "}
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Chatbot);
