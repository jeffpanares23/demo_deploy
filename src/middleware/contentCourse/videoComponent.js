import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Card, Grid, Link } from '@mui/material';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VideoTranscriptBox from './videoTransBox';

function UserProfileTabs(props) {
     const { children, value, index, ...other } = props;

     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`simple-tabpanel-${index}`}
               aria-labelledby={`simple-tab-${index}`}
               {...other}
          >
               {value === index && (
                    <Box sx={{ p: 3 }}>
                         <div>{children}</div>
                    </Box>
               )}
          </div>
     );
}

function a11yProps(index) {
     return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
     };
}

function VideoComponent({ videoSrc, transcript, subtitleSrc }) {
     const [showTranscript, setShowTranscript] = useState(true);
     const [value, setValue] = React.useState(0);
     const videoRef = useRef(null);

     const handleChange = (event, newValue) => {
          setValue(newValue);
     };

     const changeTabValue = (newValue) => {
          setValue(newValue);
     };
     useEffect(() => {
          const player = videojs(videoRef.current, {
               controls: true,
               fluid: true,
               notSupportedMessage: "Media Source Error! Please contact admin",
          });

          player.on('loadedmetadata', () => {
               const textTracks = player.textTracks();
               if (textTracks && textTracks.length > 0) {
                    const subtitleTrack = textTracks[0];
                    subtitleTrack.mode = 'showing'; // Display the subtitles

               }
          });

          return () => {
               player.dispose();
          };
     }, []);


     useEffect(() => {
          const preventRightClick = (event) => {
               event.preventDefault();
          };
          window.addEventListener('contextmenu', preventRightClick);
          return () => {
               window.removeEventListener('contextmenu', preventRightClick);
          };
     }, []);

     return (
          <Box>
               <Box sx={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}>
                    <video
                         className="video-js vjs-default-skin vjs-big-play-centered"
                         autoPlay
                         src={videoSrc}
                         type="video/mp4"
                         disablePictureInPicture={0}
                         data-setup='{"playbackRates": [0.25, 0.5, 1, 1.5, 2]}'
                         style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                         ref={videoRef}
                    >
                         <style>
                              {`
                              .vjs-has-started .vjs-control-bar, .vjs-audio-only-mode .vjs-control-bar {
                              background: transparent;
                              }
                              .vjs-default-skin .vjs-progress-holder .vjs-play-progress {
                              background: linear-gradient(
                              90deg,
                              purple,
                              transparent
                              );
                              background-size: 200% 100%;
                              `}
                         </style>
                         <source src={videoSrc} type="video/mp4" />
                         <track
                              kind="captions"
                              src='../../../../assets/courses/videos/subs/whatisproweaver.vtt'
                              srcLang="en"
                              label="English Subtitles"
                              default
                         />
                    </video>
               </Box>
               <Box sx={{ height: 'auto' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff', borderRadius: "12px 12px 0px 0px" }}>
                         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                              <Tab label="Transcript" {...a11yProps(0)} />
                              <Tab label="Downloads" {...a11yProps(1)} />
                              <Tab label="Notes" {...a11yProps(2)} />
                              <Tab label="Discuss" {...a11yProps(3)} />
                         </Tabs>
                    </Box>

                    <UserProfileTabs value={value} index={0}>
                         {showTranscript && <VideoTranscriptBox transcript={transcript} videoRef={videoRef} />}
                    </UserProfileTabs>

                    <UserProfileTabs value={value} index={1}>
                         Comming Soon!
                    </UserProfileTabs>

                    <UserProfileTabs value={value} index={2}>
                         Comming Soon!
                    </UserProfileTabs>

                    <UserProfileTabs value={value} index={3}>
                         Comming Soon!
                    </UserProfileTabs>

               </Box>
          </Box>
     );
}

export default VideoComponent;
