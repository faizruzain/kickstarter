import { Component } from "react";
import CampaignList from "./routes/home.component.jsx";
import Show from "./routes/show.component.jsx";
import { Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route>
          <Route index element={<CampaignList />} />
          <Route path="show" element={<Show />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
