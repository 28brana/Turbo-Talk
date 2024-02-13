import { VideoCamera } from '@phosphor-icons/react';
import { usePeer } from '../context/PeerContext';
import { useSocket } from '../context/SocketContext';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const VideoCall = () => {
    const userDetail = useSelector(state => state.conversation.userDetail);
    const { createOffer, createAnswer, setRemoteAnswer ,cancelCall} = usePeer();
    const socket = useSocket();
    const [incomingCall, setIncomingCall] = useState(null);
    const handleMakeCall = useCallback(
        async () => {
            const offer = await createOffer();
            socket.emit('call:make', { offer, userId: userDetail.userId });
        },
        [userDetail.userId, createOffer, socket]
    )

    const handleIncomingCall = useCallback(
        async (data) => {
            console.log('Call is coming')
            setIncomingCall(data)
        },
        []
    )

    const handleAcceptIncomingCall = useCallback(
        async () => {
            console.log('I Accept Call',incomingCall)
            const { userId, offer } = incomingCall;
            const answer = await createAnswer(offer);
            socket.emit('call:accept', { userId, answer })
        },
        [createAnswer, incomingCall, socket]
    )

    const handleRejectIncomingCall = useCallback(
        async () => {
            console.log('I Reject the Call');
            const { userId } = incomingCall;
            socket.emit('call:reject', { userId })
            setIncomingCall(null)
            await cancelCall();
        },
        [cancelCall, incomingCall, socket]
    )

    const handleCallGotReject = useCallback(
        async (data) => {
            console.log('call got rejected');
            console.log(data);
            setIncomingCall(null)
        },
        []
    )
    const handleCallGotAccepted = useCallback(
        async (data) => {
            console.log('Call got accepted');
            console.log(data);
            await setRemoteAnswer(data.answer)
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
            <div className="icon-btn" onClick={handleMakeCall}>
                <VideoCamera size={24} />
            </div>
            <div className="icon-btn" onClick={handleAcceptIncomingCall}>
                Accept Call
            </div>
            <div className="icon-btn" onClick={handleRejectIncomingCall}>
                Reject Call
            </div>
        </div>
    )
}

export default VideoCall;