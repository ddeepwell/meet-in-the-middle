import React from "react";

const MapForm = () => {
  return (
    <div>
      <label htmlFor="location-A">Location A:</label>
      <input type="text" id="location-A" />
      <br />
      <label htmlFor="location-B">Location B:</label>
      <input type="text" id="location-B" />
      <br />
      <label htmlFor="filters">Category Selection:</label>
          <input type="text" id="filters" />
          <p>Total time:</p>
          
    </div>
  );
};

export default MapForm;
