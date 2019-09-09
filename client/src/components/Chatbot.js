import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { TextField, Button, Grid } from "@material-ui/core";
import Message from "./Message";
import axios from "axios";

import { v4 as uuid } from "uuid";
import Cookies from "universal-cookie";

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
    console.log(navigator.language);
    this.eventQuery("Welcome"); //Greetings message from the bot when the component first rendered
    this.getMessages();
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" }); //scroll down to see the input element
  }

  async getMessages() {
    const identifier = cookies.get("identifier-id");
    const session_id = "bot-session" + identifier;
    const res = await axios.get(`/api/${session_id}/messages`);
    const replies = res.data.map(data => {
      return data.replies;
    });

    let messages = replies.map(msg => {
      return msg.msg;
    });
    const merged = [].concat.apply([], messages);
    console.log(merged);
    merged.map(msg => {
      let reply = {
        speaks: "bot",
        msg: msg
      };
      this.setState({ messages: [...this.state.messages, reply] });
    });
  }

  async textQuery(text) {
    let newMessage = {
      speaks: "me",
      msg: {
        text: {
          text: text
        },
        timestamp: Date.now()
      }
    };
    this.setState({ messages: [...this.state.messages, newMessage] });
    const messageIdentifier = uuid();
    const res = await axios.post("api/text_query", {
      text,
      identifier: cookies.get("identifier-id"),
      messageIdentifier,
      languageCode: navigator.language.substring(0, 2)
    });

    res.data.fulfillmentMessages.map(msg => {
      newMessage = {
        speaks: "bot",
        msg: msg,
        sent_at: new Date()
      };
      console.log(newMessage);
      this.setState({ messages: [...this.state.messages, newMessage] });
    });
  }
  async eventQuery(event) {
    const res = await axios.post("api/event_query", {
      event,
      identifier: cookies.get("identifier-id"),
      languageCode: navigator.language.substring(0, 2)
    });
    res.data.fulfillmentMessages.map(msg => {
      let newMessage = {
        speaks: "bot",
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
            speaks={message.speaks}
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
