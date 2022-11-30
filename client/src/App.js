import "./App.css";
import Home from "./Components/Home";
import LandingPage from "./Components/LandingPage";
import { Route, Switch } from "react-router-dom";
import Detail from "./Components/Detail";
import PostVideogame from "./Components/PostVideogame";

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      <Switch>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route path="/home" render={() => <Home />} />
        {/* <Route
        path="/gameDetail/:id"
        render={(match) => <Detail match={match} />}
      /> */}
        <Route path="/gameDetail/:id" component={Detail}></Route>
        <Route path="/create" render={() => <PostVideogame />} />
      </Switch>
    </div>
  );
}

export default App;
