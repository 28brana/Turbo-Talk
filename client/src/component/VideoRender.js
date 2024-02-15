import { useSelector } from 'react-redux';
import { Microphone, MicrophoneSlash, VideoCamera, VideoCameraSlash, PhoneDisconnect, Phone, UserCircle } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import { usePeer } from '../context/PeerContext';

const CallMake = ({ makeCall, handleRejectMakeCall }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-backgroundSecondary z-50">
            <div className='bg-backgroundSecondary w-full h-full flex items-center justify-center'>
                <div className='border bg-white flex items-center flex-col rounded-lg px-20 py-10'>
                    <div>
                        <div className="rounded-full cursor-pointer [width:200px] [height:200px]  flex items-center justify-center relative">
                            <img className="object-contain" alt="profile" src={makeCall.avatar} />
                        </div>
                    </div>
                    <div className='text-center mt-1'>
                        <p className='text-2xl font-semibold'>{makeCall.name} </p>
                        <p className='text-lg'>{makeCall.email}</p>
                        <p className='text-base'>calling ...</p>
                    </div>
                    <div className='flex items-center justify-center mt-14 gap-14'>
                        <div className='video-icon-btn bg-error' onClick={handleRejectMakeCall}>
                            <PhoneDisconnect size={50} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CallIncoming = ({ incomingCall, handleRejectIncomingCall, handleAcceptIncomingCall }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-backgroundSecondary z-50">
            <div className='bg-backgroundSecondary w-full h-full flex items-center justify-center'>
                <div className='border bg-white flex items-center flex-col rounded-lg px-20 py-10'>
                    <div>
                        <div className="rounded-full cursor-pointer [width:200px] [height:200px]  flex items-center justify-center relative">
                            <img className="object-contain" alt="profile" src={incomingCall.from.avatar} />
                        </div>
                    </div>
                    <div className='text-center mt-1'>
                        <p className='text-2xl font-semibold'>{incomingCall.from.username} </p>
                        <p className='text-lg'>{incomingCall.from.email}</p>
                        <p className='text-base'>calling ...</p>
                    </div>
                    <div className='flex items-center justify-center mt-14 gap-14'>
                        <div className='video-icon-btn bg-green-500' onClick={handleAcceptIncomingCall}>
                            <Phone size={50} />
                        </div>
                        <div className='video-icon-btn bg-error' onClick={handleRejectIncomingCall}>
                            <PhoneDisconnect size={50} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const VideoScreen = ({ handleCutCall }) => {
    const { remoteVideo, sendStream, cancelCall } = usePeer();
    const [video, setVideo] = useState(false);
    const [audio, setAudio] = useState(false);
    const myVideo = useRef(null);

    const askPermission = useCallback(
        () => {
            navigator.mediaDevices
                .getUserMedia({ video: { width: 1000, height: 520 }, audio: true })
                .then((stream) => {
                    setVideo(true);
                    setAudio(true);
                    myVideo.current.srcObject = stream;
                    myVideo.current.autoplay = true;
                    myVideo.current.muted = true;
                    sendStream(stream);
                }).catch((err) => {
                    console.log('Permission Denied')
                });
        }, [sendStream]
    )
    // console.log({ remoteStream: remoteVideo.current?.srcObject?.getTracks(), myStream: myVideo.current?.srcObject?.getTracks() });


    // useEffect(() => {
    //     askPermission();
    // }, [askPermission]);


    const handleVideo = () => {
        if (!myVideo.current?.srcObject) {
            alert('Please enable video & audio');
            askPermission();
            return;
        }

        if (video) {
            myVideo.current.srcObject.getVideoTracks().forEach((track) => {
                track.enabled = false;
            })
            setVideo(false);
        } else {
            myVideo.current.srcObject.getVideoTracks().forEach((track) => {
                track.enabled = true;
            })
            setVideo(true)
        }
    };

    const handleAudio = () => {
        if (!myVideo.current?.srcObject) {
            alert('Please enable video & audio');
            askPermission();
            return;
        }

        if (audio) {
            myVideo.current.srcObject.getAudioTracks().forEach((track) => {
                track.enabled = false;
            })
            setAudio(false);
        } else {
            myVideo.current.srcObject.getAudioTracks().forEach((track) => {
                track.enabled = true;
            })
            setAudio(true)
        }
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-backgroundSecondary z-50">
            <div className=" w-full h-full flex flex-col relative">
                <div className='w-full flex-1 flex items-center justify-center'>
                    <div className='rounded-3xl overflow-hidden  h-full'>
                        <video ref={remoteVideo} className='h-full w-full' />
                    </div>
                </div>
                <div className='rounded-lg [width:350px] right-4 bottom-4 overflow-hidden absolute '>
                    <video ref={myVideo} className='h-full w-full' />
                </div>
                <div className='flex items-center justify-center gap-12 py-5'>
                    <div className='video-icon-btn bg-secondary' onClick={handleAudio}>
                        {
                            audio ? <Microphone size={24} /> : <MicrophoneSlash size={24} />
                        }
                    </div>
                    <div className='video-icon-btn bg-secondary' onClick={handleVideo}>
                        {
                            video ? <VideoCamera size={24} /> : <VideoCameraSlash size={24} />
                        }
                    </div>
                    <div className='video-icon-btn bg-error' onClick={() => {
                        cancelCall(myVideo.current?.srcObject);
                        handleCutCall();
                    }}>
                        <PhoneDisconnect size={24} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const VideoRender = ({ makeCall, handleRejectMakeCall, incomingCall, handleRejectIncomingCall, handleAcceptIncomingCall, callGotAccepted, handleCutCall }) => {
    if (callGotAccepted) {
        return (
            <VideoScreen handleCutCall={handleCutCall} />
        )
    }
    return (
        <div >
            {makeCall && <CallMake makeCall={makeCall} handleRejectMakeCall={handleRejectMakeCall} />}
            {incomingCall && <CallIncoming incomingCall={incomingCall} handleRejectIncomingCall={handleRejectIncomingCall} handleAcceptIncomingCall={handleAcceptIncomingCall} />}
        </div>
    )
}
export default VideoRender;