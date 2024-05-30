import { useState, useEffect } from "react";
import Select from "react-select";
import { stations } from "../Stations";
import { fareTable } from "../assets/FareData";

export default function FareCalculator() {
  const [startingStation, setStartingStation] = useState("");
  const [arrivalStation, setArrivalStation] = useState("");
  const [cashlessFare, setCashlessFare] = useState(0.0);
  const [cashFare, setCashFare] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");

  const stationOptions = stations.map((station) => ({
    value: station.id,
    label: station.stationName,
  }));

  const handleStartingStation = (selectedStartingStation) => {
    setStartingStation(selectedStartingStation);
    setErrorMessage(null);
  };

  const handleArrivalStation = (selectedArrivalStation) => {
    setArrivalStation(selectedArrivalStation);
    setErrorMessage(null);
  };

  // Access cash and cashless fare rates in FareData

  const getCashFare = (selectedStartingStation, selectedArrivalStation) => {
    // Match selected station name from dropdown with the identical station name in fare table
    console.log("Selected Starting Station:", selectedStartingStation);
    console.log("Selected Arrival Station:", selectedArrivalStation);
    const startingStationData = fareTable.find(
      (entry) => entry.station === selectedStartingStation.label
    );

    console.log("Starting Station Data:", startingStationData);

    if (
      startingStationData &&
      startingStationData.fares[selectedArrivalStation.label]
    ) {
      return startingStationData.fares[selectedArrivalStation.label].cash;
    } else {
      console.error("Starting or arrival station not found in fareTable");
      setErrorMessage(
        "Error - Starting or arrival station not found in fare table data"
      );
      setCashFare(0.0); // Reset fare when station data is not found in fare table
      return 0.0;
    }
  };

  const getCashlessFare = (selectedStartingStation, selectedArrivalStation) => {
    // Match selected station name from dropdown with the identical station name in fare table
    console.log("Selected Starting Station:", selectedStartingStation);
    console.log("Selected Arrival Station:", selectedArrivalStation);
    const startingStationData = fareTable.find(
      (entry) => entry.station === selectedStartingStation.label
    );

    console.log("Starting Station Data:", startingStationData);

    if (
      startingStationData &&
      startingStationData.fares[selectedArrivalStation.label]
    ) {
      return startingStationData.fares[selectedArrivalStation.label].cashless;
    } else {
      console.error("Starting or arrival station not found in fareTable");
      setErrorMessage(
        "Error - Starting or arrival station not found in fare table data"
      );
      setCashlessFare(0.0); // Reset fare when station data is not found in fare table
      return 0.0;
    }
  };

  // Calculate fare only when both starting and arrival stations are selected
  useEffect(() => {
    if (startingStation && arrivalStation) {
      const cashFare = getCashFare(startingStation, arrivalStation);
      setCashFare(cashFare);
      const cashlessFare = getCashlessFare(startingStation, arrivalStation);
      setCashlessFare(cashlessFare);
    } else {
      setCashFare(0.0);
      setCashlessFare(0.0); // Reset fare when stations are not selected
    }
  }, [startingStation, arrivalStation]);

  return (
    <div className="m-4">
      <h3>Fare Calculator</h3>
      <h6 className="pt-4 dropdown-sm">Starting Station</h6>
      <Select
        className="text-dark value-container"
        value={startingStation}
        onChange={handleStartingStation}
        options={stationOptions}
        isSearchable
        isClearable
        isMulti={false}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            minHeight: "15px",
            fontSize: "15px",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0,
          }),
          menuList: (base) => ({
            ...base,
            fontSize: "15px",
          }),
        }}
      />

      <h6 className="pt-4 dropdown-sm">Arrival Station</h6>
      <Select
        className="text-dark"
        value={arrivalStation}
        onChange={handleArrivalStation}
        options={stationOptions}
        isSearchable
        isClearable
        isMulti={false}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            minHeight: "15px",
            fontSize: "15px",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0,
          }),
          menuList: (base) => ({
            ...base,
            fontSize: "15px",
          }),
        }}
      />

      <h4 className="p-2">Your Fare:</h4>
      <div className="p-4">
        <p className="border border-light rounded p-2 text-center">
          Cash:{" "}
          {!errorMessage ? (
            cashFare.toFixed(2)
          ) : (
            <p className="text-danger">{errorMessage}</p>
          )}
        </p>
        {/* <p>{errorMessage && <p className="text-danger">{errorMessage}</p>}</p> */}
        <p className="border border-light rounded p-2 text-center">
          Cashless: {cashlessFare.toFixed(2)}{" "}
        </p>
        <p className="border border-light rounded p-2 text-center">
          Concession: {(cashlessFare / 2).toFixed(2)} (dummy data due a lack of
          access to concession fare data)
        </p>
        <p>
          Disclaimer: The fare table in use only contains data for certain
          stations for demo purpose; error message will be shown if a station is
          not found in the fare table.
        </p>
      </div>
    </div>
  );
}
