import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here

const App = () => (
  <Switch>
    <Route path="/ebank/login" component={Login} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
