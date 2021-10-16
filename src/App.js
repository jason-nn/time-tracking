import React, { useState, useEffect } from "react";
import Navbar from "./Components/Shared/Navbar";
import Home from "./Components/Home/Home";
import Visualization from "./Components/Visualization/Visualization";
import Toast from "./Components/Shared/Toast";

export default function App() {
    const [DisplayHome, setDisplayHome] = useState(true);
    const [AllCheckIns, setAllCheckIns] = useState([]);
    const [Success, setSuccess] = useState(null);
    const [Error, setError] = useState(null);
    const [CheckInsGroupedByDate, setCheckInsGroupedByDate] = useState([]);
    const [CheckInsGroupedByTag, setCheckInsGroupedByTag] = useState([]);
    const [TagChartLabels, setTagChartLabels] = useState([]);
    const [TagChartData, setTagChartData] = useState([]);
    const [DayChartLabels, setDayChartLabels] = useState([]);
    const [DayChartData, setDayChartData] = useState([]);

    // Retrieves checkins from local storage if it exists already, creates checkins as an empty array otherwise
    useEffect(() => {
        if (localStorage.AllCheckIns) {
            setAllCheckIns(JSON.parse(localStorage.AllCheckIns));
        } else {
            localStorage.AllCheckIns = JSON.stringify(AllCheckIns);
        }
    }, []);

    // Groups checkins by date and saves to CheckInsGroupedByDate
    useEffect(() => {
        if (AllCheckIns.length > 0) {
            const NewCheckInsGroupedByDate = [];

            for (let i = AllCheckIns.length; i >= 0; i--) {
                const date = AllCheckIns[i]?.date;
                const dates = NewCheckInsGroupedByDate.map((i) => i.date);
                const index = dates.findIndex((i) => i === date);
                if (index === -1) {
                    NewCheckInsGroupedByDate.push({
                        date,
                        checkins: [AllCheckIns[i]],
                    });
                } else {
                    NewCheckInsGroupedByDate[index].checkins.push(
                        AllCheckIns[i]
                    );
                }
            }

            setCheckInsGroupedByDate(
                NewCheckInsGroupedByDate.filter((i) => i.date !== undefined)
            );
        }
    }, [AllCheckIns]);

    // Groups checkins by date and saves to CheckInsGroupedByTag
    useEffect(() => {
        const NewCheckInsGroupedByTag = [];

        for (let i = AllCheckIns.length; i >= 0; i--) {
            const tag = AllCheckIns[i]?.tag;
            const tags = NewCheckInsGroupedByTag.map((i) => i.tag);
            const index = tags.findIndex((i) => i === tag);
            if (index === -1) {
                NewCheckInsGroupedByTag.push({
                    tag,
                    checkins: [AllCheckIns[i]],
                });
            } else {
                NewCheckInsGroupedByTag[index].checkins.push(AllCheckIns[i]);
            }
        }

        setCheckInsGroupedByTag(
            NewCheckInsGroupedByTag.filter((i) => i.tag !== undefined)
        );
    }, [AllCheckIns]);

    // Creates labels and data for the chart Total Hours Spent by Tag
    useEffect(() => {
        const labels = [];
        const data = [];

        console.log(CheckInsGroupedByTag);

        for (let group of CheckInsGroupedByTag) {
            labels.push(group.tag);
            let hours = 0;
            for (let checkin of group.checkins) {
                hours += checkin.hours;
            }
            data.push(hours);
        }

        setTagChartLabels(labels);
        setTagChartData(data);
    }, [CheckInsGroupedByTag]);

    // Creates labels and data for the chart Total Hours Spent by Date
    useEffect(() => {
        const labels = [];
        const data = [];

        console.log(CheckInsGroupedByDate);

        for (let group of CheckInsGroupedByDate) {
            labels.push(group.date);
            let hours = 0;
            for (let checkin of group.checkins) {
                hours += checkin.hours;
            }
            data.push(hours);
        }

        setDayChartLabels(labels);
        setDayChartData(data);
    }, [CheckInsGroupedByDate]);

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
                    CheckInsGroupedByDate={CheckInsGroupedByDate}
                    CheckInsGroupedByTag={CheckInsGroupedByTag}
                    setAllCheckIns={(i) => setAllCheckIns(i)}
                    setSuccess={(i) => setSuccess(i)}
                    setError={(i) => setError(i)}
                />
            ) : (
                <Visualization
                    TagChartLabels={TagChartLabels}
                    TagChartData={TagChartData}
                    DayChartLabels={DayChartLabels}
                    DayChartData={DayChartData}
                />
            )}
        </>
    );
}
