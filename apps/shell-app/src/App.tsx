import * as React from "react";
import Button from "component-library/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = React.lazy(() => import("home-app/Home"));
const About = React.lazy(() => import("about-app/About"));

// import Home from "home-app/Home";
// import About from "about-app/About";

const App = () => (
  <div>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <React.Suspense fallback="Loading About page...">
              <About />
            </React.Suspense>
          </Route>
          <Route path="/" exact>
            <React.Suspense fallback="Loading Home page...">
              <Home />
            </React.Suspense>
          </Route>
          <Route path="/">404!</Route>
        </Switch>
      </div>
    </Router>

    <Button>This button is rendered by the shell</Button>
  </div>
);

export default App;
