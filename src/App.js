import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom"
import Schedule from './components/Schedule';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Schedule} />
        <Route path="/match/:match" exact component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
