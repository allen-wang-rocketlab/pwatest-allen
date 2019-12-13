import React, { lazy, Suspense } from 'react';

import BarcodeInputField from '../barcodeInputField/BarcodeInputField';

const Video = lazy(() => import('../Video/Video'));

const CameraHandler = () => {
  return <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Video />
    </Suspense>
  </div>
}

export default CameraHandler;
