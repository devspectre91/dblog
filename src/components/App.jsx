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
              <Login userInfo={this.state.userInfo}  logIn={this.logIn} ></Login>
            </div>
          </Route>
          <Route path="/register">
            <div className="container">
              <Register userInfo={this.state.userInfo} ></Register>
            </div>
          </Route>

          {/* passing props as render props */}
          <Route path="/articles/tags/:tag" render={(props) => <Articles userInfo={this.state.userInfo} {...props}/>} />
          <Route path="/articles/:slug"  render={(props) => <Article userInfo={this.state.userInfo} {...props}/>}/>

          <Route path="/articles">
            <Articles userInfo={this.state.userInfo}/>
          </Route>

          <Route path="/dashboard">
            <Dashboard userInfo={this.state.userInfo}/>
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
