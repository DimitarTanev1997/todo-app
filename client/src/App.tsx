import './App.css';
import React, { useState } from 'react';
import ITodo from './models/Todo.interface';
import Date from './components/Calendar/Calendar';
import IconButton from './components/IconButton/IconButton';
import TodoForm from './components/TodoForm/TodoForm';
import TodosProvider from './context/globalState';
import { useAuthContext } from './context/userState/authContext';
import Todos from './components/Todos/Todos';
import AuthForm from './components/Auth/AuthForm/AuthForm';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const { isAuthenticated, signOut } = useAuthContext()!;

  return (
      <div className="App">
        <nav>
          {isAuthenticated && <Date />}
        </nav>
        <main>
          <BrowserRouter>

            <Route exact path="/">
              <AuthForm type="signIn" />
            </Route>
            
            
            <Route exact path="/auth/signin">
              {isAuthenticated ? <Redirect push to="/" /> : <AuthForm type="signIn" />}
            </Route>
            <Route exact path="/auth/signup">
              {isAuthenticated ? <Redirect push to="/" /> : <AuthForm type="signUp"/>}
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
                    <Todos></Todos>
                  </section>

                  <section>
                    <Link to="/todos/create">
                      <IconButton className="TodoFormButton" type="FaPlusCircle" size="3em" color="#2bd485" />
                    </Link>
                  </section>
                </Route>

              <Switch>
                <Route path="/todos/create">
                  <TodoForm type="create"></TodoForm>
                </Route>

                <Route path="/todos/:id">
                  <TodoForm type="edit"></TodoForm>
                </Route>
            </Switch>

            </TodosProvider>
              )}
              {isAuthenticated && <Link to="/auth/signin" onClick={signOut}>Sign out</Link>}
          </BrowserRouter>
        </main>
      </div>
  );
};

export default App;