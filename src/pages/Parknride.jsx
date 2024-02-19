import { useState, useEffect } from "react";
import Select from "react-select";
import * as XLSX from "xlsx";

const Parknride = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  // Fetch and read the XLSX file 
  const handleFileChange = async () => {
    const filePath = "./src/assets/ParkNRide_Facilities.xlsx";  
    const reader = new FileReader();

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch the file. Status: ${response.status}`);
      }

      const data = await response.arrayBuffer();
      reader.readAsArrayBuffer(new Blob([data]));
    } catch (error) {
      console.error("Error fetching file:", error);
    }

    // Convert XLSX data to json data
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      setJsonData(sheetData);
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleFileChange();
    };

    fetchData();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    // Retrieve and set the selected data to display other information
    const selectedValue = selectedOption?.value;
    const data = jsonData.find((item) => item.No === selectedValue);

    setSelectedData(data);
    console.log(data);
}

  const pnrOptions = jsonData.length
  ? jsonData.map((data) => ({
      value: data.No,
      label: `${data.Stations} - ${data.Line}`,
    }))
  : [];

  return (
    <div className="m-4">
        <h3>Check for Park N Ride Facilities</h3>
        <h4 className="p-4">Pick a station</h4>
        
        {jsonData.length > 0 ? (
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
      <p>Loading or no data available.</p>
      )}

      {selectedData && (
          <div className="m-4 p-4 d-flex flex-column align-items-center">
            <h4 className="pb-4">Station {selectedData.Stations}</h4>
            <p className="bg-success p-2 bg-opacity-25 w-50">Total Parking Bays: {selectedData.TotalParkingBays}</p>
            <p className="bg-primary p-2 bg-opacity-25 w-50">Total OKU Bays: {selectedData.TotalOKUBays}</p>
            <p className="p-2 bg-opacity-25 w-50" style={{backgroundColor: "#FFB6C1"}}>Total Women Bays: {selectedData.TotalWomenBays}</p>
            <p className="bg-light p-2 w-50">Total Motorcycle Bays: {selectedData.TotalMotorcycleBays}</p>
          </div>
      )}

      <p className="pt-4">Stations that are not listed may not have Park N Ride facilities.</p>
    </div>
    
  )
};

export default Parknride;
