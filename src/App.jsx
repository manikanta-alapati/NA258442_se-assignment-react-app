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
      name: "Manikanta Alapati",
      about:
        "Hii , I am Manikanta Alapati and I am pusuring masters in computer science in University At Albany.",
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
