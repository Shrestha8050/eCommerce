import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Homepage';
import NotFound from './404';
import Login from './Login';
import SignUp from './Signup';
import AdminDashboard from './Dashboard/admin';
import userDashboard from './Dashboard/user';
import AdminRoute from './Route/AdminRoute';
import UserRoute from './Route/UserRoute';
const App = () => (
  <>
    <Header />
    <main>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <UserRoute exact path='/user/dashboard' component={userDashboard} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </>
);

export default App;
