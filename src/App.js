import "./App.css";
import { client } from "./http";
import classnames from "classnames";
import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  Avatar,
  CircularProgress,
  Divider,
  FontIcon,
  GridList,
  GridTile,
  IconButton,
  TextField,
} from "material-ui";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 500,
  },
};

class App extends Component {
  state = {
    users: [],
    fetching: false,
  };

  handleChange = e => {
    const { value } = e.target;

    if (value === "") {
      this.setState({ users: [] });
    }

    if (value !== "") {
      this.setState({ fetching: true }, () => {
        client
          .get(`/search/users?q=${value}&sort=followers&order=desc`)
          .then(response => response.data.items)
          .then(users => {
            this.setState({ users, fetching: false });
          })
          .catch(error => {
            this.setState({ fetching: false });
            console.warn(error);
          });
      });
    }
  };

  openGithubProfile = url => {
    window.open(url, { target: "_blank" });
  };

  render() {
    const { users, fetching } = this.state;

    const textFieldStyles = {
      hintStyle: {
        color: "rgba(255,255,255,0.4)",
      },
      inputStyle: {
        color: "#72DDF7",
      },
      underlineStyle: {
        borderColor: "rgba(255, 255, 255, 0.25)",
      },
      underlineFocusStyle: {
        borderColor: "#72DDF7",
      },
    };

    return (
      <MuiThemeProvider>
        <div className="container">
          <section className="search-bar">
            <TextField
              hintText="Search Users"
              onChange={this.handleChange}
              {...textFieldStyles}
            />
          </section>
          {fetching && <CircularProgress />}
          <section className="results" style={styles.root}>
            <GridList
              cellHeight={180}
              style={styles.gridList}
              className={classnames("results-table", {
                "results-table-show": users.length > 0,
              })}
            >
              {users.map(user => {
                return (
                  <GridTile
                    key={user.login}
                    title={user.login}
                    actionIcon={
                      <IconButton
                        onClick={() => this.openGithubProfile(user.html_url)}
                        style={{ color: "white" }}
                      >
                        <i class="material-icons">link</i>
                      </IconButton>
                    }
                  >
                    <img src={user.avatar_url} />
                  </GridTile>
                );
              })}
            </GridList>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
