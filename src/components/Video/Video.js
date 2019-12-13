import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

import VideoSkeleton from './Video.skeleton';

const Video = () => {
  const [videoInit, setVideoInit] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [cameraFacingUser, setCameraFacingUser] = useState(true);

  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  }

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);
    setBarcode(result.codeResult.code);
    // do the API stuff
  }

  const switchCameraHandler = () => {
    Quagga.pause();
    setCameraFacingUser(!cameraFacingUser);
    Quagga.start();
    setVideoInit(true);
    console.log(cameraFacingUser)
  }

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#video'),
          constraints: {
            width: 900,
            height: 300,
            facingMode: cameraFacingUser ? "user" : "environment"
          }
        },
        numOfWorkers: 1,
        locate: true,
        decoder: {
          readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
        }
      }, (err) => {
        if (err) {
          setVideoError(true);
          return;
        }
        onInitSuccess();
      });
      Quagga.onDetected(onDetected);
    }
  }, []);

  return <div>
    <div>
      <p>Scan a product</p>
    </div>
    <div>
      {videoError ?
        <div>
          <p>Your device does not support camera access. Please enter the barcode in the space provided.</p>
        </div>
        :
        <div>
          <div id="video" />
          {videoInit ? '' : <VideoSkeleton />}
        </div>
      }
      <button type="button" onClick={() => switchCameraHandler()}>Switch</button>
    </div>
    {barcode}
  </div>
}

export default Video;
