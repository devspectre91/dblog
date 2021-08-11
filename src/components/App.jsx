import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Articles from "./Articles";
import Register from "./Register";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Article from "./Article";

class App extends React.Component {
  render() {
    return (
      <>
        <Header />

        <Switch>
          <Route path="/login">
            <div className="container">
              <Login></Login>
            </div>
          </Route>
          <Route path="/register">
            <div className="container">
              <Register></Register>
            </div>
          </Route>
          <Route path="/articles/tags/:tag" component={Articles} />
          <Route path="/articles/:slug" component={Article} />

          <Route path="/articles">
            <Articles />
          </Route>

          <Route path="/">
            <div className="container">
              <Home />
            </div>
          </Route>
        </Switch>

        <Footer />
      </>
    );
  }
}

export default App;
