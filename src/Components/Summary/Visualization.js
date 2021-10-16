import React, { useState, useRef } from "react";
import { Bar } from "react-chartjs-2";

export default function Visualization({
    TagChartLabels,
    TagChartData,
    DayChartLabels,
    DayChartData,
}) {
    const [DisplayChart, setDisplayChart] = useState("Tag");
    const DisplayChartRef = useRef();

    const data = {
        labels: DisplayChart === "Tag" ? TagChartLabels : DayChartLabels,
        datasets: [
            {
                label: "Total Hours Spent",
                data: DisplayChart === "Tag" ? TagChartData : DayChartData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
            title: {
                display: false,
                text: "Horizontal Bar Chart",
            },
        },
    };

    return (
        <div className="Visualization">
            <div className="Bar">
                <div>
                    <select
                        name="DisplayChart"
                        id="DisplayChart"
                        value={DisplayChart}
                        ref={DisplayChartRef}
                        onChange={() =>
                            setDisplayChart(DisplayChartRef.current.value)
                        }
                    >
                        <option value="Tag">Total Hours Spent per Tag</option>
                        <option value="Day">Total Hours Spent per Day</option>
                    </select>
                </div>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
