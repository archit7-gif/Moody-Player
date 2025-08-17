
// import { useState } from 'react'
// import './MoodSongs.css'

// const MoodSongs = ({ Songs }) => {

//     const [ isPlaying, setIsPlaying ] = useState(null);

//     const handlePlayPause = (index) => {
//         if (isPlaying === index) {
//             setIsPlaying(null);
//         } else {  
//             setIsPlaying(index);
//         }
//     };


//     return (
//         <div className='mood-songs'>
//             <h2>Recommended Songs</h2>

//             {Songs.map((song, index) => (
//                 <div className='song' key={index}>
//                     <div className="title">
//                         <h3>{song.title}</h3>
//                         <p>{song.artist}</p>
//                     </div>
//                     <div className="play-pause-button">
//                         {
//                             isPlaying === index &&
//                             <audio
//                                 src={song.audio} style={{
//                                     display: 'none'
//                                 }}
//                                 autoPlay={isPlaying === index}
//                             ></audio>
//                         }
//                         <button onClick={() => handlePlayPause(index)}>
//                             {isPlaying === index ? <i className="ri-pause-line"></i> : <i className="ri-play-circle-fill"></i>}
//                         </button>
//                     </div>

//                 </div>
//             ))}

//         </div>
//     )
// }

// export default MoodSongs


import { useState, useRef } from 'react';
import './MoodSongs.css';

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const [currentTime, setCurrentTime] = useState({}); // store last time for each song
  const audioRefs = useRef([]); // store refs for each song

  const handlePlayPause = (index) => {
    const audio = audioRefs.current[index];

    if (isPlaying === index) {
      // Pause the song
      audio.pause();
      setCurrentTime((prev) => ({
        ...prev,
        [index]: audio.currentTime, // save current time
      }));
      setIsPlaying(null);
    } else {
      // Stop other songs
      if (isPlaying !== null && audioRefs.current[isPlaying]) {
        audioRefs.current[isPlaying].pause();
      }

      // Resume from last paused time (if exists)
      if (currentTime[index]) {
        audio.currentTime = currentTime[index];
      }
      audio.play();
      setIsPlaying(index);
    }
  };

  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>

      {Songs.map((song, index) => (
        <div className="song" key={index}>
          <div className="title">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div className="play-pause-button">
            {/* Always render audio (just hidden) */}
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={song.audio}
              style={{ display: 'none' }}
              onEnded={() => setIsPlaying(null)} // reset when song ends
            />

            <button onClick={() => handlePlayPause(index)}>
              {isPlaying === index ? (
                <i className="ri-pause-line"></i>
              ) : (
                <i className="ri-play-circle-fill"></i>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;
