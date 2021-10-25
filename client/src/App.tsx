import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import TodoForm from './components/TodoForm/TodoForm';
import TodosProvider from './context/globalState';
import { useAuthContext } from './context/userState/authContext';
import Todos from './components/Todos/Todos';
import AuthForm from './components/Auth/AuthForm/AuthForm';
import SearchBar from './components/SearchBar/SearchBar';
import Launch from './components/Launch/Launch';
import Navigation from './components/Navigation/Navigation';
import Button from './components/Buttons/Button/Button';

const App = (): JSX.Element => {
  const { isAuthenticated, signOut } = useAuthContext()!;
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const transition = useTransition(isFormOpen, {

  // });

  const handleFormToggle = (): void => {
    setIsFormOpen((prevState) => !prevState);
  };

  return (
    <div className="App">
      <Navigation />
      <main>
        <BrowserRouter>
          <Route exact path="/">
            <Launch />
          </Route>

          <Route exact path="/auth/signin">
            {isAuthenticated ? (
              <Redirect push to="/" />
            ) : (
              <AuthForm type="Login" />
            )}
          </Route>
          <Route exact path="/auth/signup">
            {isAuthenticated ? (
              <Redirect push to="/" />
            ) : (
              <AuthForm type="Create Account" />
            )}
          </Route>

          {isAuthenticated && (
            <TodosProvider>
              <Route exact path="/">
                {isAuthenticated && <Redirect push to="/todos" />}
              </Route>
              <Route exact path="/todos">
                <section>
                  <SearchBar />
                </section>

                <section>
                  <Todos />
                </section>

                <TodoForm type="create" isOpen={isFormOpen} />
                <Button
                  typeOption="button"
                  styleOption="icon"
                  iconType="FaPlusCircle"
                  callback={handleFormToggle}
                  iconColor="green"
                  className="button--fixed"
                />
              </Route>

              <Switch>
                <Route path="/todos/create">
                  <TodoForm isOpen type="create" />
                </Route>

                <Route path="/todos/:id">
                  <TodoForm isOpen type="edit" />
                </Route>
              </Switch>
            </TodosProvider>
          )}
          {isAuthenticated && (
            <Link to="/" onClick={signOut}>
              Sign out
            </Link>
          )}
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;
