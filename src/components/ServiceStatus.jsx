import { useState, useEffect } from "react";

export default function ServiceStatus() {
    const [trainData, setTrainData] = useState([]);
    const [timestampData, setTimestampData] = useState("");

    useEffect(() => {
        fetch("https://api.mtrec.name.my/api/servicestatus")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTrainData(data.Data);
                setTimestampData(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    
// format the timestamp data
    function formatDate(inputDate) {
        const date = new Date(inputDate);
      
        const formattedDate = date.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true
        });
      
        return formattedDate;
    }

    return (
        <div className="m-4">
            <h3>Train Line Status Live Updates</h3>
            <ul className="list-unstyled text-start">
                {trainData.map((train) => (
                train.Status === "Normal Service" ? (
                    <li key={train.LineID} className="p-2">
                    <span>{train.Line}: </span>
                    <span className="badge bg-success">{train.Status}</span>
                    </li>
                ) : train.Status === null ? (
                    <li key={train.LineID} className="p-2">
                    <span>{train.Line}: </span>
                    <span className="badge bg-secondary">{"Status unavailable"}</span>
                    <span>{train.Remark}</span>
                    </li>
                ) : (
                    <li key={train.LineID} className="p-2">
                    <span>{train.Line}: </span>
                    <span className="badge bg-danger">{train.Status}</span>
                    <div>Remark: {train.Remark}</div>
                    </li>
                )
            ))}
            </ul>

            {/* Only render timestamp if the data exists*/}
            {timestampData.Timestamp && (
            <p>Last Updated: {timestampData.Timestamp && formatDate(timestampData.Timestamp)} </p>
        )} {console.log(trainData) }
            <p>Data courtesy of <a href="https://www.mtrec.name.my/">MTREC</a></p>
        </div>
    );

}
