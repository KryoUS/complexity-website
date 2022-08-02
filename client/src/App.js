import './App.css';
import Header from './components/header/Header';
import SiteNews from './components/news/SiteNews';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Simulations from './components/simulations/SimulationCraft';
import '@fontsource/roboto';
import {
  Switch,
  Route,
  // Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
        <Switch>
          <Route component={SiteNews} exact path="/" />
          <Route component={About} path="/about" />
          <Route component={Simulations} path="/simulations" />
        </Switch>
      <Footer />      
    </div>
  );
}

export default App;
