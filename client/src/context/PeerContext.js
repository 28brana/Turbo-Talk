import React, { createContext, useContext, useMemo } from 'react';

const PeerContext = createContext();

const PeerProvider = ({ children }) => {
    const peer = useMemo(() => {
        const configuration = { iceServers: [{ urls: ['stun:stun.l.google.com:19302', 'stun:global.stun.twilio.com:3478'] }] };
        return new RTCPeerConnection(configuration);
    }, []);

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }

    const setRemoteAnswer = async (answer) => {
        await peer.setRemoteDescription(answer);
    }
    const cancelCall = async () => {
        // await peer.close();
    }
    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, cancelCall }}>
            {children}
        </PeerContext.Provider>
    );
};

const usePeer = () => {
    const peer = useContext(PeerContext);
    if (!peer) {
        throw new Error('usePeer must be used within a PeerProvider');
    }
    return peer;
};

export { PeerProvider, usePeer };

// Steps
// 1. We don't know our public Ip so to get public id we make request to iceServers that return publicIp of our
// 2. We send our public id to another user (calling )
// 3. Accept connection (Call recevied)
// Conclusion: Need public id to have serverless data transfer