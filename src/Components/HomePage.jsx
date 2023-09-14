import React from "react";
import { useState } from "react";
import axios from "axios";

function HomePage() {
  //state hooks to define files, progress and msg
  const [newFile, setNewFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [displayExtract, setDisplayExtract] = useState(false);
  /**/ const [parsedText, setParsedText] = useState([]); /**/
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  //to parse text from file
  let fileReader;

  function handleUpload() {
    //check if file exists
    if (!newFile) {
      setMsg("No file selected");
      return;
    }

    //  console.log(newFile.name);

    //if file exists

    const file = {
      id: Math.floor(Math.random() * 1000),
      value: newFile.name,
    };

    setFiles((oldList) => [...oldList, file]);
    setNewFile(null);

    console.log(files);

    const fd = new FormData();
    fd.append("file", newFile);

    setMsg("Uploading...");
    //change status to started = true
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post("http://httpbin.org/post", fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: progressEvent.progress * 100 };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload successful");
        console.log(res.data);
      })
      .catch((err) => {
        setMsg("Upload failed");
        console.error(err);
      });

    fileReader = new FileReader();

    fileReader.onloadend = handleExtractText;
    fileReader.readAsText(newFile);
  }

  function handleDisplayExtract() {
    setDisplayExtract(true);
  }

  function handleExtractText() {
    const content = fileReader.result;
    console.log(content);

    const parsedText = {
      id: Math.floor(Math.random() * 1000),
      value: content,
    };

    setParsedText((oldList) => [parsedText]);
  }

  function deleteFile(id) {
    console.log(id);
    const newArray = files.filter((file) => file.id !== id);
    setFiles(newArray);
    setParsedText([]);
  }

  return (
    <div>
      <h2> Upload Files</h2>

      <input
        class="custom-file-upload"
        onChange={(e) => {
          setNewFile(e.target.files[0]);
        }}
        type="file"
      />
      <button onClick={handleUpload}> Upload </button>

      <span className="comments">
        {progress.started && (
          <progress max="100" value={progress.pc}></progress>
        )}
        {msg && <span>{msg}</span>}
      </span>

      <span className="filelist">
        {files.map((file) => {
          return (
            <li key={file.id}>
              {" "}
              {file.value}{" "}
              <button
                className="deletebutton"
                onClick={() => deleteFile(file.id)}
              >
                {" "}
                ✗{" "}
              </button>
            </li>
          );
        })}
      </span>

      <button onClick={handleDisplayExtract} className="extract">
        Extract
      </button>

      <div className="parseddiv">
        {displayExtract ? (
          <span className="parsedtext">
            {parsedText.map((parsedText) => {
              return <li key={parsedText.id}> {parsedText.value} </li>;
            })}
          </span>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}

export default HomePage;
