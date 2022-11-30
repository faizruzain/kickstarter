import { Component } from "react";
import CampaignList from "./routes/home.component.jsx";
import Show from "./routes/show.component.jsx";
import CampaignPage from "./routes/campaign-address.component.jsx";
import CreateNewCampaign from "./routes/create-new-campaign.component.jsx";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header.component.jsx";
// import Footer from "./components/footer.component.jsx";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  render() {
    return (
      <Container style={{marginTop: "20px"}}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                {/* <Footer /> */}
              </>
            }
          >
            <Route index element={<CampaignList />} />
            <Route path="/show" element={<Show />} />
            <Route path="/campaigns/new" element={<CreateNewCampaign />} />
            <Route path="/campaigns/:address" element={<CampaignPage />} />
          </Route>
        </Routes>
      </Container>
    );
  }
}

export default App;
