import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Articles from "./Articles";
import Register from "./Register";
import Header from "./Header";
// import Footer from "./Footer";
import Home from "./Home";
import Article from "./Article";
import Dashboard from "./Dashboard";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      userInfo:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')):null
    }
  }
  
   logIn=(user)=>{
  this.setState({
    userInfo:user
  })
   }
   logOut=()=>{
    localStorage.removeItem('userInfo');
    this.setState({
      userInfo:null
    })
     }

  render() {
    return (
      <>
        <Header userInfo={this.state.userInfo} logOut={this.logOut}/>

        <Switch>
          <Route path="/login">
            <div className="container">
              <Login logIn={this.logIn} ></Login>
            </div>
          </Route>
          <Route path="/register">
            <div className="container">
              <Register ></Register>
            </div>
          </Route>
          <Route path="/articles/tags/:tag" component={Articles} />
          <Route path="/articles/:slug" component={Article} />

          <Route path="/articles">
            <Articles />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/">
            
              <Home />
           
          </Route>
        </Switch>

      
      </>
    );
  }
}

export default App;
