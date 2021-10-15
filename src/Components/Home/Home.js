import React, { useRef } from "react";

export default function Home({
    AllCheckIns,
    setAllCheckIns,
    setSuccess,
    setError,
}) {
    const hoursRef = useRef();
    const tagRef = useRef();
    const activityRef = useRef();

    return (
        <div className="Home">
            <div className="Left"></div>
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
