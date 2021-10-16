import React, { useState, useEffect } from "react";

export default function Navbar({ setDisplayHome }) {
    const [Time, setTime] = useState(
        new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
        })
    );

    // Updates Time every 1000ms
    useEffect(() => {
        let TimeInterval = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric",
                })
            );
        }, 1000);
        return () => {
            clearInterval(TimeInterval);
        };
    }, []);

    return (
        <div className="Navbar">
            <div className="Left">
                <span>{Time}</span>
            </div>
            <div className="Right">
                <span onClick={() => setDisplayHome(true)}>Home</span>
                <span onClick={() => setDisplayHome(false)}>Visualization</span>
            </div>
        </div>
    );
}
