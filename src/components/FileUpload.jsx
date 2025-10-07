import React from "react";

function FileUpload({ onUpload }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
  };

  return (
    <input
      type="file"
      multiple
      accept=".pdf,.txt"
      onChange={handleChange}
      className="border p-2 rounded my-2"
    />
  );
}

export default FileUpload;
