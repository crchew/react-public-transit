import { useState } from "react";
import Select from "react-select";
import { ParkNRideList } from "../assets/parknridelist";

const Parknride = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStationName, setSelectedStationName] = useState("");
  const [selectedStationParking, setSelectedStationParking] = useState("");
  const [selectedStationOKU, setSelectedStationOKU] = useState("");
  const [selectedStationWomen, setSelectedStationWomen] = useState("");
  const [selectedStationMotorcycle, setSelectedStationMotorcycle] = useState("");
  

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    const selectedStationName = ParkNRideList.find((item) => item.Stations === selectedOption?.value);
    const selectedStationParking = selectedStationName ? selectedStationName.TotalParkingBays : "N/A";
    const selectedStationOKU = selectedStationName ? selectedStationName.TotalOKUBays : "N/A";
    const selectedStationWomen = selectedStationName ? selectedStationName.TotalWomenBays : "N/A";
    const selectedStationMotorcycle = selectedStationName ? selectedStationName.TotalMotorcycleBays : "N/A";
  
    setSelectedStationName(selectedStationName);
    setSelectedStationParking(selectedStationParking);
    setSelectedStationOKU(selectedStationOKU);
    setSelectedStationWomen(selectedStationWomen);
    setSelectedStationMotorcycle(selectedStationMotorcycle);
  }

  const pnrOptions = ParkNRideList.length
  ? ParkNRideList.map((data) => ({
      value: data.Stations,
      label: `${data.Stations} - ${data.Line}`,
    }))
  : [];

  return (
    <div className="m-4">
        <h3>Check for Park N Ride Facilities</h3>
        <h4 className="p-4">Pick a station</h4>
        
       {ParkNRideList.length > 0 ? (
        <Select
          style={{ height: "20px" }}
          value={selectedOption}
          onChange={handleChange}
          options={pnrOptions}
          isSearchable
          isClearable
          isMulti={false}
        />
      ) : (
        <p>No data available.</p>
      )}

      {selectedOption && (
        <div className="m-4 p-4 d-flex flex-column align-items-center">
          <h4 className="pb-4">Station {selectedStationName.Stations}</h4>
          <p className="bg-success p-2 bg-opacity-25 w-50">Total Parking Bays: {selectedStationParking}</p>
          <p className="bg-primary p-2 bg-opacity-25 w-50">Total OKU Bays: {selectedStationOKU}</p>
          <p className="p-2 bg-opacity-25 w-50" style={{backgroundColor: "#FFB6C1"}}>Total Women Bays: {selectedStationWomen}</p>
          <p className="bg-light p-2 w-50">Total Motorcycle Bays: {selectedStationMotorcycle}</p>
        </div>
      )}

      <p className="pt-4">Stations that are not listed may not have Park N Ride facilities.</p>
    </div>
    
  )
};

export default Parknride;
