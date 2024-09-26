import "./App.css";
import { Provider } from "react-redux";
import MultiStepForm from "./components/MultiStepForm";
import store from "./store";
import Read from "./components/Read";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewPage } from "./components/ViewPage/ViewPage";
import { Update } from "./editform/Update";
import { Skillsedit } from "./editform/Skillsedit";
import { Addressedit } from "./editform/Addressedit";
function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/form" element={<MultiStepForm />} />
            <Route path="/" element={<Read />} />
            <Route path="/view/:id" element={<ViewPage />} />
            <Route path="/skills/:id" element={<Skillsedit />} />
            <Route path="/address/:id" element={<Addressedit />} />
            <Route path="/edit/:id" element={<Update />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
