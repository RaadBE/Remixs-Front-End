import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing_page from "./componets/main/landing_page";
import {NavbarSimple} from "./componets/common/nav-bar";
import SearchResults from "./componets/main/search results";
import Mainpage from "./componets/main/mainpage";
import Terms from "./componets/common/Terms";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Mainpage />} />
                    <Route path='/tos' element={<Landing_page />} />
                    <Route path='/results' element={<SearchResults />} />
                    <Route path='/Terms' element={<Terms />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
