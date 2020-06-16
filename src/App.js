import React from 'react';
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Loading from './components/Loading';
import Nav from './components/Nav';

const StateList = React.lazy(() => import('./components/StateList'))

const Helpline = React.lazy(() => import('./components/Helpline'))

const Headlines = React.lazy(() => import('./components/Headlines'))

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="container">
          <Nav />

          <React.Suspense fallback={<Loading/>}>
            <Switch>
              <Route exact path='/' component={StateList} />
              <Route exact path='/helpline' component={Helpline} />
              <Route path='/headlines' component={Headlines} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </React.Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
