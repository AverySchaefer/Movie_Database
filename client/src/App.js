import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./Components/dashboard/navbar";
import Edit from "./Components/crud/edit";
import Create from "./Components/crud/create";
import Movielist from "./Components/crud/movieList";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/">
        <movieList />
      </Route>
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create">
        <Create />
      </Route>
    </div>
  );
};

export default App;