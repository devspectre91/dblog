import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from './Login';
import Articles from './Articles';
import Register from './Register';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';



class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <>
      <Header />
 <div className='container'>
 <Switch>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='/register'>
          <Register></Register>
        </Route>
        <Route path='/articles'>
          <Articles></Articles>
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
 </div>
      <Footer /> 
       </>;
  }
}

export default App;
