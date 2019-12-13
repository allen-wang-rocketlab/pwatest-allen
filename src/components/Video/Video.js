import React, { useState, useEffect } from "react";
import { BrowserQRCodeReader } from "@zxing/library";

import VideoSkeleton from "./Video.skeleton";

const Video = () => {
  const [videoInit, setVideoInit] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [cameraFacingUser, setCameraFacingUser] = useState(true);

  // const onInitSuccess = () => {
  //   Quagga.start();
  //   setVideoInit(true);
  // }

  // const onDetected = (result) => {
  //   Quagga.offDetected(onDetected);
  //   setBarcode(result.codeResult.code);
  //   // do the API stuff
  // }

  // const switchCameraHandler = () => {
  //   Quagga.pause();
  //   setCameraFacingUser(!cameraFacingUser);
  //   Quagga.start();
  //   setVideoInit(true);
  //   console.log(cameraFacingUser)
  // }

  // useEffect(() => {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     Quagga.init({
  //       inputStream: {
  //         name: "Live",
  //         type: "LiveStream",
  //         target: document.querySelector('#video'),
  //         constraints: {
  //           width: 900,
  //           height: 300,
  //           facingMode: cameraFacingUser ? "user" : "environment"
  //         }
  //       },
  //       numOfWorkers: 1,
  //       locate: true,
  //       decoder: {
  //         readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
  //       }
  //     }, (err) => {
  //       if (err) {
  //         setVideoError(true);
  //         return;
  //       }
  //       onInitSuccess();
  //     });
  //     Quagga.onDetected(onDetected);
  //   }
  // }, []);

  let selectedDeviceId;
  const codeReader = new BrowserQRCodeReader();
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
        const sourceSelectPanel = document.getElementById("sourceSelectPanel");
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
            // if (err && !(err instanceof ZXing.NotFoundException)) {
            //   console.error(err);
            //   document.getElementById("result").textContent = err;
            // }
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

  return (
    <div>
      <div>
        <h1 className="title">Scan a product</h1>

        <div>
          <button id="startButton">
            Start
          </button>
          <button id="resetButton">
            Reset
          </button>
        </div>

        <div>
          <video
            id="video"
            width="300"
            height="200"
            style={{border: "1px solid gray"}}
          ></video>
        </div>

        <div id="sourceSelectPanel" style={{display: "none"}}>
          <label htmlFor="sourceSelect">Change video source:</label>
          <select id="sourceSelect" style={{maxWidth: "400px"}}></select>
        </div>

        <label>Result:</label>
        <pre>
          <code id="result"></code>
        </pre>
      </div>
    </div>
  );
};

export default Video;
