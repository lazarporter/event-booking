import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import { NavBar } from './components/Navigation/Nav';
import { theme } from './constants/Theme';
import AuthPage from './pages/Auth';
import BookingsPage from './pages/Bookings';
import EventsPage from './pages/Events';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Redirect from="/" to="/auth" exact />
          <Route path="/auth" component={() => <AuthPage />} />
          <Route path="/events" component={() => <EventsPage />} />
          <Route path="/bookings" component={() => <BookingsPage />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
