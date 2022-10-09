import React from "react";
import AddNumbers from "./AddNumbers";
import "./App.css";
import NavBar from "./NavBar";
import NewsArticleList from "./NewsArticleList";
import Profile from "./Profile";

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentSection: "news",
      name: "Jake Smith",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
  }
  saveStateToLocalStorage() {
    localStorage.setItem("appState", JSON.stringify(this.state));
  }
  componentDidMount() {
    const appState = localStorage.getItem("appState");
    if (appState) {
      this.setState(JSON.parse(appState));
    }
    window.addEventListener("beforeunload", this.saveStateToLocalStorage);
  }
  render() {
    const { currentSection } = this.state;
    const sections = [
      {
        id: "news",
        title: "News",
      },
      {
        id: "profile",
        title: "Profile",
      },
      {
        id: "addNumbers",
        title: "Add Numbers",
      },
    ];
    return (
      <div className="container-fluid min-vh-100 p-0">
        <NavBar
          navItems={sections.map((item) => ({
            ...item,
            onClick: () => this.setState({ currentSection: item.id }),
          }))}
          userName={this.state.name}
          onUserNameChange={(name) => this.setState({ name })}
        />
        <div className="container-fluid pt-4">
          {currentSection === "news" && (
            <div className="container mb-3">
              <h3>Welcome {this.state.name}! Here is latest news for you.</h3>
            </div>
          )}
          {currentSection === "news" && <NewsArticleList />}
          {currentSection === "profile" && (
            <Profile
              name={this.state.name}
              about={this.state.about}
              onNameChange={(name) => this.setState({ name })}
              onAboutChange={(about) => this.setState({ about })}
            />
          )}
          {currentSection === "addNumbers" && <AddNumbers />}
        </div>
      </div>
    );
  }
}

export default App;
