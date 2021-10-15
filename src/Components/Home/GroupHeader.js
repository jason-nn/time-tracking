import React from "react";

export default function GroupHeader({ content }) {
    return (
        <div className="GroupHeader">
            <div className="content">{content}</div>
            <div className="line"></div>
        </div>
    );
}
