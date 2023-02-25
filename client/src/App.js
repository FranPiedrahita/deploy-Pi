
import "./App.css";
import Home from "./components/Home/Home";
import Form from "./components/Formulario/Form";
 import Details from "./components/Detail/Details";
import { BrowserRouter, Route, Switch } from "react-router-dom";
 import Landing from "./components/Landing/Landing";
import axios from "axios";


axios.defaults.baseURL="http://localhost:3001"
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      
        
         <Route exact path="/" component={Landing} /> 
        <Route  path="/home" component={Home} />
         <Route exact path="/create" component={Form} />
        <Route path="/details/:id" component={Details} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;