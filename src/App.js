import React, { useState } from "react";
import Navbar from "./Components/Shared/Navbar";
import Home from "./Components/Home/Home";
import Summary from "./Components/Summary/Summary";

export default function App() {
    const [DisplayHome, setDisplayHome] = useState(true);

    return (
        <>
            <Navbar setDisplayHome={(i) => setDisplayHome(i)} />
            {DisplayHome ? <Home /> : <Summary />}
        </>
    );
}
