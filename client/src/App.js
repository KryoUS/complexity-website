import './App.css';
import Header from './components/header/Header';
import News from './components/news/SiteNews';
import Footer from './components/footer/Footer';
import About from './components/about/About';
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
          <Route component={News} exact path="/" />
          <Route component={About} path="/about" />
        </Switch>
      <Footer />      
    </div>
  );
}

export default App;
