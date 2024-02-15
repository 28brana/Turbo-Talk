import { VideoCamera } from '@phosphor-icons/react';
import { usePeer } from '../context/PeerContext';
import { useSocket } from '../context/SocketContext';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VideoRender from './VideoRender';

const VideoCall = () => {
    const userDetail = useSelector(state => state.conversation.userDetail);
    const myDetail = useSelector(state => state.auth);
    const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer();
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
            setIncomingCall(null);
            setMakeCall(null);
            setCallGotAccepted(null);
            // await cancelCall();
        },
        [incomingCall, socket]
    )

    const handleCallGotReject = useCallback(
        async () => {
            console.log('Call got Cancel')
            setIncomingCall(null);
            setMakeCall(null);
            setCallGotAccepted(null);
            window.location.reload()
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


    const handleCutCall = useCallback(
        async () => {
            console.log('I Cut The call');
            socket.emit('call:reject', { userId: userDetail.userId })
            setIncomingCall(null);
            setMakeCall(null);
            setCallGotAccepted(null);
        },
        [socket, userDetail.userId]
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


    // NEGOTIATION ----------------------------------------------------

    const handleNegoNeeded = useCallback(async () => {
        console.log('Negotiation Needed');
        const offer = await createOffer();
        socket.emit('nego:needed', { offer, to: userDetail.userId, from: myDetail.userDetail._id })
    }, [createOffer, myDetail.userDetail._id, socket, userDetail.userId])

    const handleNegoIncoming = useCallback(async ({ offer, to, from }) => {
        const answer = await createAnswer(offer);
        socket.emit('nego:accept', { answer, to, from })
    }, [createAnswer, socket])

    const handleNegoAccept = useCallback(async ({ answer }) => {
        console.log('Negotiation Accepted');
        await setRemoteAnswer(answer);
    }, [setRemoteAnswer])

    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegoNeeded);
        socket.on('nego:incoming', handleNegoIncoming);
        socket.on('nego:accept', handleNegoAccept);
        return () => {
            peer.removeEventListener('negotiationneeded', handleNegoNeeded);
            socket.off('nego:incoming', handleNegoIncoming);
            socket.off('nego:accept', handleNegoAccept);
        }
    }, [handleNegoAccept, handleNegoIncoming, handleNegoNeeded, peer, socket])

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
                handleCutCall={handleCutCall}
            />
            <div className="icon-btn" onClick={handleMakeCall}>
                <VideoCamera size={24} />
            </div>
        </div>
    )
}

export default VideoCall;