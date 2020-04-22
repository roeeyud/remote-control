import { useEffect, useState } from 'react';
import Peer from 'peerjs';

async function getUserMedia() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        return stream;
    } catch (e) {
        console.error(e);
        throw new Error('getUserMedia');
    }
}

async function startStream(peerId, targetPeerId, setRemoteStream) {
    const stream = await getUserMedia();
    const peer = new Peer(peerId, {
        // eslint-disable-next-line
        host: location.hostname,
        port: 9000,
        path: '/peer'
    }); 
    if (targetPeerId) {
        peer.on('open', function(id) {
            const connection = peer.call(targetPeerId, stream);
            connection.on('stream', (remoteStream) => {
                setRemoteStream(remoteStream);
            });
            connection.on('close', () => {
                setRemoteStream(null);
            });
            console.log('My peer ID is: ' + id);
        });
        
    } else {
        peer.on('open', function(id) {
            peer.on('call', (connection) => {
                connection.answer(stream);
                connection.on('stream', (remoteStream) => {
                    setRemoteStream(remoteStream);
                });
                connection.on('close', () => {
                    setRemoteStream(null);
                });
            });
            console.log('My peer ID is: ' + id);
        });
    }
    peer.on('disconnected', () => {
        setRemoteStream(null);
    });
    return {
        peer,
        stream,
    };
}

export default function useStreams(targetPeerId, peerId, chatOn) {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peer, setPeer] = useState(null);
    
    useEffect(() => {
        if (!chatOn) return;
        async function setStream() {
            const { stream, peer: newPeer } = await startStream(peerId, targetPeerId, setRemoteStream);
            setPeer(newPeer);
            setLocalStream(stream);
        }
        setStream();
    }, [chatOn, peerId, targetPeerId, setRemoteStream, setLocalStream]);
    return {
        peer,
        localStream,
        remoteStream,
        setLocalStream,
        setRemoteStream,
    };
}