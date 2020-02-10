import React, {Component} from 'react';
import Cont from './components/cont';
import Admin from './admin/container';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


class App extends Component{
  render(){
    return(
      <div>
        <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Cont} />
        </Switch>
        </BrowserRouter>        
      </div>
      
    )
  }

}

export default App