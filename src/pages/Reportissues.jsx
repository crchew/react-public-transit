import { useState } from "react";
import { Form, FormLabel, FormGroup, FormControl, Button, Alert } from "react-bootstrap";
import { stations } from "../Stations";

export default function IssueForm() {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedStation, setSelectedStation] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleIssueChange = (e) => {
    setSelectedIssue(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  }

  const handleStationChange = (e) => {
    setSelectedStation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessAlert(true);
    const uniqueId = Date.now();
  
    const formData = new FormData();
    formData.append("uniqueId", uniqueId);
    formData.append("selectedIssue", selectedIssue);
    formData.append("selectedDate", selectedDate);
    formData.append("selectedStation", selectedStation);
    formData.append("description", description);
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:5174/submit-issue", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Data submitted successfully");
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
  return (
    <>
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-3">
        <FormLabel>Select Issue:</FormLabel>
        <FormControl as="select" value={selectedIssue} onChange={handleIssueChange} required>
          <option value="">Select an issue</option>
          <option value="maintenance">Maintenance</option>
          <option value="cleanliness">Cleanliness</option>
          <option value="security">Security</option>
          <option value="others">Others</option>
        </FormControl>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Date of Issue:</FormLabel>
        <FormControl
          as="input"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
        />
      </FormGroup>

      <FormGroup className="mb-3">
      <FormLabel>Select Train Station:</FormLabel>
        <FormControl as="select" value={selectedStation} onChange={handleStationChange} required>
            <option value="">Select a station</option>
            {stations.map((station) => (
            <option key={station.id} value={station.stationName}>
                {station.stationName}
            </option>
            ))
            }
        </FormControl>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Description:</FormLabel>
        <FormControl as="textarea" value={description} onChange={handleDescriptionChange} placeholder="Provide more details about your issue" rows={4} required />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Upload File (Optional):</FormLabel>
        <FormControl type="file" onChange={handleFileChange} />
      </FormGroup>

      <Button type="submit" className="m-4">Submit</Button>
    </Form>
    
    <div>
      {/* Success Alert */}
      {showSuccessAlert && (
        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
          <Alert.Heading>Form submitted successfully!</Alert.Heading>
          <p>Thank you for your feedback.</p>
        </Alert>
      )}
    </div>
  </>
  );
}
