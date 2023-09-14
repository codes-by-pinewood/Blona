import React from "react";
import PrintText from "./PrintText";
import { useState } from "react";

const ImportFromFileBody = () => {
  //set parsed text
  const [parsedText, setParsedText] = useState("");
  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content);
    //setParsedText(content);
    //console.log("parsedText" + parsedText);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();

    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="upload-expense">
      <input
        type="file"
        id="file"
        className="input-file"
        accept=".pdf"
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
    </div>
  );
};

export default ImportFromFileBody;
