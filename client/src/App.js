import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/dashboard/navbar";
import Edit from "./components/crud/edit";
import Create from "./components/create";
import Movielist from "./components/crud/movieList";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/">
        <MovieListList />
      </Route>
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create">
        <Create />
      </Route>
    </div>
  );
};

export default App;