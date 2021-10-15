import React, { useState, useEffect } from "react";
import Navbar from "./Components/Shared/Navbar";
import Home from "./Components/Home/Home";
import Summary from "./Components/Summary/Summary";
import Toast from "./Components/Shared/Toast";

export default function App() {
    const [DisplayHome, setDisplayHome] = useState(true);
    const [AllCheckIns, setAllCheckIns] = useState([]);
    const [Success, setSuccess] = useState(null);
    const [Error, setError] = useState(null);

    useEffect(() => {
        if (localStorage.AllCheckIns) {
            setAllCheckIns(JSON.parse(localStorage.AllCheckIns));
        } else {
            localStorage.AllCheckIns = JSON.stringify(AllCheckIns);
        }
    }, []);

    return (
        <>
            {Success ? (
                <>
                    <Toast className="Success Toast" text={Success} />
                </>
            ) : null}
            {Error ? (
                <>
                    <Toast className="Error Toast" text={Error} />
                </>
            ) : null}

            <Navbar setDisplayHome={(i) => setDisplayHome(i)} />
            {DisplayHome ? (
                <Home
                    AllCheckIns={AllCheckIns}
                    setAllCheckIns={(i) => setAllCheckIns(i)}
                    setSuccess={(i) => setSuccess(i)}
                    setError={(i) => setError(i)}
                />
            ) : (
                <Summary />
            )}
        </>
    );
}
