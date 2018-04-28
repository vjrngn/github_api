import "./App.css";
import { client } from "./http";
import classnames from "classnames";
import Avatar from "material-ui/Avatar";
import TextField from "material-ui/TextField";
import React, { Component, Fragment } from "react";
import CircularProgress from "material-ui/CircularProgress";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import { Divider } from "material-ui";

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

  render() {
    window.client = client;
    const { users, fetching } = this.state;

    return (
      <MuiThemeProvider>
        <div className="container">
          <section className="search-bar">
            <TextField
              hintText="Search Users"
              onChange={this.handleChange}
              hintStyle={{
                color: "rgba(255,255,255,0.4)",
              }}
              underlineStyle={{
                borderColor: "rgba(255, 255, 255, 0.25)",
              }}
              underlineFocusStyle={{
                borderColor: "#72DDF7",
              }}
            />
          </section>
          <Divider inset={true} />
          <section className="results">
            {fetching && <CircularProgress />}
            <Table className={classnames("results-table", {
              "results-table-show": users.length > 0
            })} selectable={false}>
              <TableHeader displayRowCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>#</TableHeaderColumn>
                  <TableHeaderColumn>GitHub Username</TableHeaderColumn>
                  <TableHeaderColumn>Profile Link</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {users.map((user, index) => {
                  return (
                    <TableRow key={user.login}>
                      <TableRowColumn>{index + 1}</TableRowColumn>
                      <TableRowColumn>{user.login}</TableRowColumn>
                      <TableRowColumn>
                        <a href={user.html_url} target="_blank">
                          Visit GitHub Profile
                        </a>
                      </TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
