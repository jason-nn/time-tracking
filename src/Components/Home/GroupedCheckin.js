import React from "react";

export default function GroupedCheckin({ data }) {
    return (
        <>
            <div>
                {data.date} {data.tag} {data.activity}
            </div>
        </>
    );
}
