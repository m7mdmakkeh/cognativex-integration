import "./css/App.css";
import Nav from "./components/Nav/Nav";
import logo from "./assets/logo.svg";
import whiteLogo from "./assets/logo-white.svg";
import { Routes, Route } from "react-router-dom";
import {
    MetaDataChecker,
    AboutUs,
    JoinUs,
    ContactUs,
    IntegrationDocs,
} from "./components/export";
import { useEffect, useRef, useState } from "react";

function App() {
    const [authorized, setAuthorized] = useState(null);
    const attempted = useRef(false);

    useEffect(() => {
        if (attempted.current) return;
        if(localStorage?.cxToken && localStorage?.cxTokenExpiry){
          const expiryDate = +localStorage.cxTokenExpiry;
          if(new Date().getTime() < expiryDate){
            return setAuthorized(true);
          }
        }
        const pass = prompt("Password:");
        attempted.current = true;
        if (pass?.toLocaleLowerCase() === "integration@cx") {
            setAuthorized(true);
            localStorage?.setItem('cxToken', "6c82549a-9834-4dad-a685-d09dc2fe9185");
            // set to 3 hours
            localStorage?.setItem('cxTokenExpiry', new Date().getTime() + (3 * 60 * 60 * 1000));
        } else setAuthorized(false);
    }, []);

    return (
        <div className="App">
            {authorized ? (
                <>
                    <div className="logo mg-auto">
                        <img src={logo} alt="CognativeX Logo" />
                    </div>

                    <Nav />
                    <section className="container">
                        <Routes>
                            <Route
                                path="/integration/metadatachecker"
                                element={<MetaDataChecker />}
                            />
                            <Route
                                path="/integration"
                                element={<IntegrationDocs />}
                            />
                            {/* <Route path='/JoinUs' element= { <JoinUs /> } />
            <Route path='/AboutUs' element= { <AboutUs /> } />
            <Route path='/ContactUs' element= { <ContactUs /> } /> */}
                        </Routes>
                    </section>
                </>
            ) : (
                <div className="unauthorized-message">
                    <div className="logo mg-auto">
                        <img src={whiteLogo} alt="CognativeX Logo" />
                    </div>
                    <h2>
                        To view this content, please contact info@cognativex.com
                    </h2>
                </div>
            )}
        </div>
    );
}

export default App;
