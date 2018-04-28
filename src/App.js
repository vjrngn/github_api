import React, { Component } from "react";
import "./App.css";
import { client } from "./http";

class App extends Component {
  state = {
    users: [],
    fetching: false,
  };

  handleChange = e => {
    const { value } = e.target;

    if (value !== "") {
      this.setState({ fetching: true }, () => {
        client
          .get(
            `/search/users?q=${value}&sort=followers&order=desc`
          )
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
      <div className="App">
        <section className="search-bar">
          <input type="text" onChange={this.handleChange} />
        </section>
        <section className="results">
          {fetching && "Searching ..."}
          {users.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>GitHub Username</th>
                  <th>Profile Link</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={user.login}>
                      <td>{index + 1}</td>
                      <td>{user.login}</td>
                      <td>
                        <a href={user.html_url} target="_blank">
                          Visit GitHub Profile
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </div>
    );
  }
}

export default App;
