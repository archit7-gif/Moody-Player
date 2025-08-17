import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import "./facial.css"
import axios from 'axios';

// Mood mapping (face-api → custom moods)
const moodMapping = {
  happy: 'happy',
  sad: 'sad',
  angry: 'energetic',
  surprised: 'party',
  neutral: 'calm',
  fearful: 'romantic',
  disgusted: 'calm'
};

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();
  const [noFace, setNoFace] = useState(false);  // new state

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    let mostProableExpression = 0;
    let _expression = '';

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      setNoFace(true);        // show message
      setSongs([]);           // clear songs
      return;
    }

    setNoFace(false);         // face detected, remove message

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProableExpression) {
        mostProableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    const mappedMood = moodMapping[_expression] || 'calm';
    console.log(`Detected: ${_expression}, Mapped to: ${mappedMood}`);

axios.get(`${import.meta.env.VITE_BACKEND_URL}/songs?mood=${mappedMood}`)
  .then(res => {
    console.log(res.data);
    if (res.data.songs.length === 0) {
      alert("No songs found for this mood!");
      setSongs([]); // clear songs
    } else {
      setSongs(res.data.songs);
    }
  })
  .catch(err => console.error("Error fetching songs:", err));


  }


  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='user-video'
      />
      <br />
      <button className='button' onClick={detectMood}>Detect Mood</button>

      {/* NO FACE DETECTED MESSAGE */}
      {noFace && (
        <p style={{
          color: "#ff6b6b",
          fontWeight: "500",
          marginTop: "20px",
          marginRight :"120px",
          textAlign: "center",
          fontSize: "0.95rem"
        }}>
          No face detected. Please align your face properly.
        </p>
      )}
    </div>
  );
}


// .en



