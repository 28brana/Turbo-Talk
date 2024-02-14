import { useSelector } from 'react-redux';
import { Microphone, MicrophoneSlash, VideoCamera, VideoCameraSlash, PhoneDisconnect } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import { usePeer } from '../context/PeerContext';

const CallAccepted = () => {
    return (
        <div>

        </div>
    )
}

const CallInitiated = () => {
    // const [mystream, setmystream] = useState(null);
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const myVideo = useRef(null);

    const askPermission = useCallback(
        () => {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setVideo(true);
                    setAudio(true);
                    myVideo.current.srcObject = stream;
                    myVideo.current.autoplay = true;
                    myVideo.current.muted = true;
                    // sendStream(stream);
                    // setmystream(stream);
                }).catch((err) => {
                    console.log('Permission Denied')
                });
        }, []
    )

    useEffect(() => {
        askPermission();
    }, [askPermission]);

    const handleVideo = () => {
        if (!myVideo.current.srcObject) {
            // window.alert("To use video and audio, please allow permissions.");
            askPermission();
            return;
        }
        // setVideo((prevVideo) => {
        //     const newVideoState = !prevVideo;
        //     const videoTracks = myVideo.current.srcObject.getVideoTracks();

        //     if (videoTracks.length > 0) {
        //         console.log(videoTracks);
        //         videoTracks.forEach((track) => {
        //             track.enabled = false;
        //             track.stop();
        //         });
        //     }

        //     myVideo.current.pause();
        //     myVideo.current.load();
        //     myVideo.current.src='';
        //     myVideo.current.srcObject = null;
        //     myVideo.current.remove();


        //     return newVideoState;
        // });
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: true
            })
            .then(function (stream) {
                console.log('got stream with id ' + stream.id)
                stream.getTracks().forEach(function (track) { track.stop() })
                // WebCam will not be busy anymore
                myVideo.current.srcObject = null;

            })
            .catch(function (reason) {
                console.error('capture failed ' + reason)
            })

    };

    const handleAudio = () => {
        // if (audioswitch) {
        //     setaudio(false);
        //     mystream.getTracks().forEach(function (track) {
        //         if (track.readyState === "live" &&
        //             track.kind === "audio") {
        //             track.enabled = false;
        //         }
        //     });
        // } else {
        //     setaudio(true);
        //     mystream.getTracks().forEach(function (track) {
        //         if (track.readyState === "live" &&
        //             track.kind === "audio") {
        //             track.enabled = true;
        //         }
        //     });
        // }
    };


    return (
        <div className="bg-red-400 w-full h-full flex flex-col">

            <div className='bg-green-400 w-full flex-1'>
                <video ref={myVideo} />
            </div>
            <div className='border bg-white flex items-center justify-center gap-12 pb-20'>
                <div className='video-icon-btn bg-secondary' onClick={handleAudio}>
                    {
                        audio ? <Microphone size={32} /> : <MicrophoneSlash size={32} />
                    }
                </div>
                <div className='video-icon-btn bg-secondary' onClick={handleVideo}>
                    {
                        video ? <VideoCamera size={32} /> : <VideoCameraSlash size={32} />
                    }
                </div>
                <div className='video-icon-btn bg-error'>
                    <PhoneDisconnect size={32} />
                </div>
            </div>
        </div>
    )
}

const VideoRender = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-backgroundSecondary z-50">
            <CallInitiated />
        </div>
    )
}
export default VideoRender;