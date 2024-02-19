import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import TransitMap from "./pages/TransitMap"
import ImageWithOverlayText from "./components/Banner"; 
import TwitterFeedUpdates from "./components/TwitterFeedUpdates"; 
import FareCalculator from "./components/FareCalculator";
import ServiceStatus from "./components/ServiceStatus";
import Parknride from "./pages/Parknride";
import IssueForm from "./pages/Reportissues";
import TwitterFeedMrt from "./components/TwitterFeedMrt";

function HomeLayout() {
  return(
    <>
        <div style={{ paddingTop: "50px" }}>
        <ImageWithOverlayText />
        </div>

        <div className="row border rounded bg-dark text-light">
          <div className="col-md-auto">
            <ServiceStatus />
          </div>

          <div className="col">
            <FareCalculator />
          </div>
        </div>

          <div className="row border rounded bg-dark text-light">
            <div className="col-md-4">
              <TwitterFeedMrt />
            </div>

            <div className="col-md-4">
              <TwitterFeedUpdates />
            </div>
          </div>
    </>
  )
}

function App() {
  return (
    <>
    {/* Navigation bar */}
    <BrowserRouter>
     <NavBar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/transitmap" element={<TransitMap />} />
        <Route path="/parknride" element={<Parknride />} />
        <Route path="issues" element={<IssueForm />} />
        <Route index element={<HomeLayout />} />
  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
