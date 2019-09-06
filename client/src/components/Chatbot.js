import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { TextField, Button, Grid } from "@material-ui/core";
import Message from "./Message";
import axios from "axios";

import { v4 as uuid } from "uuid";
import Cookies from "universal-cookie";
import DetectLanguage from "detectlanguage";

const detectLanguage = new DetectLanguage({
  key: "11e3c4ee547466256cb64048503dee95",
  ssl: true || false
});

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

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ""
    };
    this.messagesEnd = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    if (cookies.get("identifier-id") === undefined) {
      //cookie generated if no identifier-id is defined yet
      cookies.set("identifier-id", uuid(), { path: "/" }); //identifier-id generated for user
    }

    var dataSimple = "I am a Teapot and a Submarine";
    detectLanguage.detect(dataSimple, function(error, result) {
      console.log(JSON.stringify(result));
    });

    console.log(cookies.get("identifier"));
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.textQuery(e.target.value);
      e.target.value = "";
      this.setState({
        message: ""
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.textQuery(this.state.message);
    this.setState({
      message: ""
    });
  }

  componentDidMount() {
    this.eventQuery("Welcome"); //Greetings message from the bot when the component first rendered
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" }); //scroll down to see the input element
  }

  async textQuery(text) {
    let newMessage = {
      identifier: "me",
      msg: {
        text: {
          text: text
        },
        timestamp: Date.now()
      }
    };
    this.setState({ messages: [...this.state.messages, newMessage] });
    const res = await axios.post("api/text_query", {
      text,
      identifier: cookies.get("identifier-id")
    });

    res.data.fulfillmentMessages.map(msg => {
      newMessage = {
        identifier: "bot",
        msg: msg
      };
      this.setState({ messages: [...this.state.messages, newMessage] });
    });
  }
  async eventQuery(event) {
    const res = await axios.post("api/event_query", {
      event,
      identifier: cookies.get("identifier-id")
    });
    res.data.fulfillmentMessages.map(msg => {
      let newMessage = {
        identifier: "bot",
        msg: msg
      };
      this.setState({ messages: [...this.state.messages, newMessage] });
    });
  }

  displayMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, idx) => {
        return (
          <Message
            identifier={message.identifier}
            text={message.msg.text.text}
            key={idx}
          ></Message>
        );
      });
    } else {
      return null;
    }
  }
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <div className={classes.messages} spacing={2}>
          <Grid container direction="row">
            <Grid item>
              <h2 className={classes.title}>Lytt</h2>
            </Grid>
          </Grid>
          <Grid item>{this.displayMessages(this.state.messages)}</Grid>
          <Grid item container direction="row">
            <Grid item xs={9}>
              <TextField
                ref={el => {
                  this.messagesEnd = el;
                }}
                type="text"
                name="message"
                value={this.state.message}
                placeholder="Write a message"
                onChange={this.onChange}
                onKeyPress={this.handleKeyPress}
              ></TextField>
            </Grid>
            <Grid item xs={3}>
              <Button type="submit" form="message" onClick={this.onSubmit}>
                SEND
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Chatbot);
