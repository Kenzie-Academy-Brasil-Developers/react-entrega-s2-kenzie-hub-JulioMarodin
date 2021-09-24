import { useState, useEffect } from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';

function Routes() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState();

  useEffect(() => {
    let cancel = false;
    const token = JSON.parse(localStorage.getItem('@KenzieHub:token'));
    if (!cancel) {
      setAuthenticated(!authenticated);
    }
    return () => {
      cancel = true;
    };
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home authenticated={authenticated} />
      </Route>
      <Route path="/cadastro">
        <Cadastro authenticated={authenticated} />
      </Route>
      <Route path="/login">
        <Login
          currentUserEmail={currentUserEmail}
          setCurrentUserEmail={setCurrentUserEmail}
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          currentUserEmail={currentUserEmail}
          setCurrentUserEmail={setCurrentUserEmail}
          authenticated={authenticated}
        />
      </Route>
    </Switch>
  );
}

export default Routes;
