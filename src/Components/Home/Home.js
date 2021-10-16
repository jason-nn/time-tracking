import React, { useState, useRef } from "react";
import GroupHeader from "./GroupHeader";
import GroupedCheckin from "./GroupedCheckin";

export default function Home({
    AllCheckIns,
    CheckInsGroupedByDate,
    CheckInsGroupedByTag,
    setAllCheckIns,
    setSuccess,
    setError,
}) {
    const hoursRef = useRef();
    const tagRef = useRef();
    const activityRef = useRef();
    const GroupByRef = useRef();

    const [GroupBy, setGroupBy] = useState("Date");

    // Renders checkins grouped by date
    function renderCheckInsGroupedByDate() {
        const output = [];

        if (CheckInsGroupedByDate.length > 0) {
            for (let group of CheckInsGroupedByDate) {
                output.push(
                    <GroupHeader key={group.date} content={group.date} />
                );
                output.push(
                    <GroupedCheckin
                        AllCheckIns={AllCheckIns}
                        setAllCheckIns={(i) => setAllCheckIns(i)}
                        className={"GroupedCheckin Labels"}
                        key={"labelsfor" + group.date}
                        data={{
                            date: "Date",
                            tag: "Tag",
                            hours: "Hours",
                            activity: "Activity",
                        }}
                    />
                );
                for (let checkin of group?.checkins) {
                    output.push(
                        <GroupedCheckin
                            AllCheckIns={AllCheckIns}
                            setAllCheckIns={(i) => setAllCheckIns(i)}
                            className={"GroupedCheckin"}
                            key={checkin.date + checkin.tag + checkin.activity}
                            data={checkin}
                        />
                    );
                }
                output.push(<br key={"br1for" + group.date} />);
                output.push(<br key={"br2for" + group.date} />);
            }
        }

        return output;
    }

    // Renders checkins grouped by tag
    function renderCheckInsGroupedByTag() {
        const output = [];

        if (CheckInsGroupedByTag.length > 0) {
            for (let group of CheckInsGroupedByTag) {
                output.push(
                    <GroupHeader key={group.tag} content={group.tag} />
                );
                output.push(
                    <GroupedCheckin
                        AllCheckIns={AllCheckIns}
                        setAllCheckIns={(i) => setAllCheckIns(i)}
                        className={"GroupedCheckin Labels"}
                        key={"labelsfor" + group.tag}
                        data={{
                            date: "Date",
                            tag: "Tag",
                            hours: "Hours",
                            activity: "Activity",
                        }}
                    />
                );
                for (let checkin of group?.checkins) {
                    output.push(
                        <GroupedCheckin
                            AllCheckIns={AllCheckIns}
                            setAllCheckIns={(i) => setAllCheckIns(i)}
                            className={"GroupedCheckin"}
                            key={checkin.date + checkin.tag + checkin.activity}
                            data={checkin}
                        />
                    );
                }
                output.push(<br key={"br1for" + group.tag} />);
                output.push(<br key={"br2for" + group.tag} />);
            }
        }

        return output;
    }

    return (
        <div className="Home">
            <div className="Left">
                <div className="Top">
                    <div>
                        <h2>All check ins</h2>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="GroupBy">Group by</label>
                        <select
                            name="GroupBy"
                            id="GroupBy"
                            value={GroupBy}
                            ref={GroupByRef}
                            onChange={() =>
                                setGroupBy(GroupByRef.current.value)
                            }
                        >
                            <option value="Date">Date</option>
                            <option value="Tag">Tag</option>
                        </select>
                    </div>
                </div>
                <div className="Bottom">
                    {GroupBy === "Date"
                        ? renderCheckInsGroupedByDate()
                        : renderCheckInsGroupedByTag()}
                </div>
            </div>
            <div className="Right">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const hours = parseFloat(hoursRef.current.value);
                        const tag = tagRef.current.value;
                        const activity = activityRef.current.value;

                        if (hours && tag && activity) {
                            if (hours > 0) {
                                const date = new Date().toLocaleDateString();

                                setAllCheckIns([
                                    ...AllCheckIns,
                                    { date, hours, tag, activity },
                                ]);

                                localStorage.AllCheckIns = JSON.stringify([
                                    ...AllCheckIns,
                                    { date, hours, tag, activity },
                                ]);

                                hoursRef.current.value = null;
                                tagRef.current.value = null;
                                activityRef.current.value = null;
                                setError(null);
                                setSuccess("Successfully added check in");
                                setTimeout(() => {
                                    setSuccess(null);
                                }, 2000);
                            } else {
                                setSuccess(null);
                                setError(
                                    "Please make sure Hours is a positive number"
                                );
                                setTimeout(() => {
                                    setError(null);
                                }, 2000);
                            }
                        } else {
                            setSuccess(null);
                            setError(
                                "Please make sure all fields are filled in"
                            );
                            setTimeout(() => {
                                setError(null);
                            }, 2000);
                        }
                    }}
                >
                    <h2>Add a check in</h2>
                    <div>
                        <label>
                            <div>Hours</div>
                            <input type="number" step="any" ref={hoursRef} />
                        </label>
                        <label>
                            <div>Tag</div>
                            <input type="text" ref={tagRef} />
                        </label>
                        <label>
                            <div>Activity</div>
                            <input type="text" ref={activityRef} />
                        </label>
                    </div>
                    <div>
                        <button>Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
