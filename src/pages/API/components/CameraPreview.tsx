import React, { useEffect, useRef } from "react";

const CameraPreview = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          if (videoRef.current) {
            (videoRef.current as any).srcObject = stream;
          }
        })
        .catch((err) => alert(err));
    }
  }, []);

  return <video ref={videoRef} autoPlay={true} />;
};

export default CameraPreview;