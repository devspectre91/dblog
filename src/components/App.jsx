import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import {UserProvider} from './UserContext';
import Register from "./Register";
import Header from "./Header";
// import Footer from "./Footer";
import Home from "./Home";
import Feed from "./Feed";
import Article from "./Article";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Settings from "./Settings";
import NotFound from "./NotFound";
import CreateArticle from "./CreateArticle";
import EditArticle from "./EditArticle";
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo"))
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
      maxArticles: null,
    };
  }

  logIn = (user) => {
    this.setState({
      userInfo: user,
    });
  };
  logOut = () => {
    localStorage.removeItem("userInfo");
    this.setState({
      userInfo: null,
    });
  };

  async componentDidMount() {
    await fetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        return data.articlesCount;
      })
      .then((data) => {
        this.setState({
          maxArticles: data,
        });
      });
  }
  render() {
    return (
      <>
        <ErrorBoundary>
        <UserProvider value={this.state.userInfo}>
   
   
          <Header
           
            logOut={this.logOut}
            updatePage={this.updatePage}
          />

          <Switch>
            <Route path="/login" exact>
              <div className="container">
                <Login
                 
                  logIn={this.logIn}
                ></Login>
              </div>
            </Route>
            <Route path="/register" exact>
              <div className="container">
                <Register></Register>
              </div>
            </Route>

            {/* passing props as render props */}
            {/* <Route
            path="/articles/tags/:tag"
            render={(props) => (
              <Feed userInfo={this.state.userInfo}  {...props} />
            )}
          /> */}
            <Route path="/articles/:slug">
              <Article  exact />
            </Route>
            <Route
              path="/article/edit/:slug"
              render={(props) => (
                <EditArticle  {...props} exact />
              )}
            />

            <Route path="/articles" exact>
              <Feed
                maxArticles={this.state.maxArticles}
              
              />
            </Route>

            <Route path="/dashboard" exact>
              <Dashboard
                maxArticles={this.state.maxArticles}
               
              />
            </Route>
            <Route
              path="/profiles"
              render={(props) => (
                <Profile {...props} />
              )}
              exact
            />
            <Route
              path="/profiles/:username"
              render={(props) => (
                <Profile  {...props} />
              )}
              exact
            />

            <Route path="/settings" exact>
              <Settings logIn={this.logIn} />
            </Route>

            <Route path="/new" exact>
              <CreateArticle />
            </Route>

            <Route path="/" exact>
              <Home  exact />
            </Route>

            <Route component={NotFound} />
          </Switch>
          </UserProvider>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
