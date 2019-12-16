import "./Video.css";
import React, { useEffect } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const Video = () => {
  useEffect(() => {
    let selectedDeviceId;
    const codeReader = new BrowserMultiFormatReader();
    console.log("ZXing code reader initialized");
    codeReader
      .getVideoInputDevices()
      .then(videoInputDevices => {
        const sourceSelect = document.getElementById("sourceSelect");
        selectedDeviceId = videoInputDevices[0].deviceId;
        if (videoInputDevices.length >= 1) {
          videoInputDevices.forEach(element => {
            const sourceOption = document.createElement("option");
            sourceOption.text = element.label;
            sourceOption.value = element.deviceId;
            sourceSelect.appendChild(sourceOption);
          });
          sourceSelect.onchange = () => {
            selectedDeviceId = sourceSelect.value;
          };
          const sourceSelectPanel = document.getElementById(
            "sourceSelectPanel"
          );
          sourceSelectPanel.style.display = "block";
        }
        document.getElementById("startButton").addEventListener("click", () => {
          codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            "video",
            (result, err) => {
              if (result) {
                console.log(result);
                document.getElementById("result").textContent = result.text;
              }
              if (err && !(err instanceof NotFoundException)) {
                console.error(err);
                document.getElementById("result").textContent = err;
              }
            }
          );
          console.log(
            `Started continous decode from camera with id ${selectedDeviceId}`
          );
        });
        document.getElementById("resetButton").addEventListener("click", () => {
          codeReader.reset();
          document.getElementById("result").textContent = "";
          console.log("Reset.");
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div>
        <h1 className="title">Scan a product</h1>

        <div>
          <button id="startButton" className="actionButton">
            Start
          </button>
          <button id="resetButton" className="actionButton">
            Reset
          </button>
        </div>

        <div id="sourceSelectPanel" style={{ display: "none" }}>
          <label htmlFor="sourceSelect" className="sourceSelect">
            Change video source:
          </label>
          <select
            id="sourceSelect"
            className="sourceSelect"
            style={{ maxWidth: "400px" }}
          ></select>
        </div>

        <div className="resultOutput">
          <label>Result:</label>
          <div>
            <label id="result"></label>
          </div>
        </div>
        <div>
          <video
            id="video"
            width="70%"
            height="auto"
            style={{ border: "1px solid gray" }}
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Video;
