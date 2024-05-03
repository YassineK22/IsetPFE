import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Protected from "./components/Protected";
import SeConnecter from "./page/SeConnecter";
import Main from "./page/Main";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/seconnecter"
            element={<Protected Component={SeConnecter}/>}
          />
          <Route
            path="/main"
            element={<Protected Component={Main} />}
          />
          <Route path="*" element={<Navigate to="/seconnecter" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
