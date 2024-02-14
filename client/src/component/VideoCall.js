import { VideoCamera } from '@phosphor-icons/react';
import { usePeer } from '../context/PeerContext';
import { useSocket } from '../context/SocketContext';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoRender from './VideoRender';

const VideoCall = () => {
    const userDetail = useSelector(state => state.conversation.userDetail);
    const myDetail = useSelector(state => state.auth);
    const { createOffer, createAnswer, setRemoteAnswer, cancelCall } = usePeer();
    const socket = useSocket();
    const [makeCall, setMakeCall] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [callGotAccepted, setCallGotAccepted] = useState(null);
    // --------------------------------------------
    const handleMakeCall = useCallback(
        async () => {
            const offer = await createOffer();
            socket.emit('call:make', { offer, from: myDetail.userDetail, to: userDetail });
            setMakeCall(userDetail);
        },
        [createOffer, socket, myDetail.userDetail, userDetail]
    )
    const handleRejectMakeCall = useCallback(
        async () => {
            socket.emit('call:reject', { userId: userDetail.userId });
            setMakeCall(null);
        },
        [socket, userDetail.userId]
    )
    // ------------------------------------------
    const handleIncomingCall = useCallback(
        async (data) => {
            console.log('Call is coming')
            console.log(data)
            setIncomingCall(data)
        },
        []
    )

    const handleAcceptIncomingCall = useCallback(
        async () => {
            console.log('I Accept Call', incomingCall)
            const { from, to, offer } = incomingCall;
            const answer = await createAnswer(offer);
            socket.emit('call:accept', { from, to, answer })
            setCallGotAccepted(true);

        },
        [createAnswer, incomingCall, socket]
    )

    const handleRejectIncomingCall = useCallback(
        async () => {
            console.log('I Cancel The call');
            const { _id } = incomingCall.from;
            socket.emit('call:reject', { userId: _id })
            setIncomingCall(null)
            // await cancelCall();
        },
        [incomingCall, socket]
    )

    const handleCallGotReject = useCallback(
        async () => {
            console.log('Call got Cancel')
            setIncomingCall(null);
            setMakeCall(null);
        },
        []
    )
    const handleCallGotAccepted = useCallback(
        async (data) => {
            console.log('Call got accepted');
            console.log(data);
            await setRemoteAnswer(data.answer);
            setCallGotAccepted(true);
        },
        [setRemoteAnswer]
    )


    useEffect(() => {
        socket.on('call:incoming', handleIncomingCall)
        socket.on('call:accept', handleCallGotAccepted);
        socket.on('call:reject', handleCallGotReject);

        return () => {
            socket.off('call:incoming', handleIncomingCall)
            socket.off('call:accept', handleCallGotAccepted);
            socket.off('call:reject', handleCallGotReject);
        }
    }, [handleCallGotAccepted, handleCallGotReject, handleIncomingCall, socket])

    return (
        <div className='flex '>
            <VideoRender
                makeCall={makeCall}
                handleRejectMakeCall={handleRejectMakeCall}
                incomingCall={incomingCall}
                handleRejectIncomingCall={handleRejectIncomingCall}
                handleAcceptIncomingCall={handleAcceptIncomingCall}
                callGotAccepted={callGotAccepted}
                setCallGotAccepted={setCallGotAccepted}
            />
            <div className="icon-btn" onClick={handleMakeCall}>
                <VideoCamera size={24} />
            </div>
        </div>
    )
}

export default VideoCall;