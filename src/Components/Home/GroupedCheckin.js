import React from "react";

export default function GroupedCheckin({
    data,
    className,
    AllCheckIns,
    setAllCheckIns,
}) {
    return (
        <div className={className}>
            <span>{data.date}</span>
            <span>{data.tag}</span>
            <span>{data.activity}</span>
            {className === "GroupedCheckin" ? (
                <div
                    className="Delete"
                    onClick={() => {
                        let NewAllCheckIns = [...AllCheckIns];
                        const index = AllCheckIns.findIndex(
                            (CheckIn) =>
                                CheckIn.date === data.date &&
                                CheckIn.tag === data.tag &&
                                CheckIn.activity === data.activity
                        );
                        NewAllCheckIns.splice(index, 1);
                        setAllCheckIns(NewAllCheckIns);
                        localStorage.AllCheckIns =
                            JSON.stringify(NewAllCheckIns);
                    }}
                >
                    &#128465;
                </div>
            ) : (
                <span />
            )}
        </div>
    );
}
