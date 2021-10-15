import React from "react";

export default function GroupedCheckin({ data, className }) {
    return (
        <div className={className}>
            <span>{data.date}</span>
            <span>{data.tag}</span>
            <span>{data.activity}</span>
        </div>
    );
}
