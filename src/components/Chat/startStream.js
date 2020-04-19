import Peer from 'peerjs';

export default async function startStream(peerId, targetPeerId, setRemoteStream) {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    const peer = new Peer(peerId, {
        // eslint-disable-next-line
        host: location.hostname,
        port: 9000,
        path: '/peer'
    }); 
    if (targetPeerId) {
        peer.on('open', function(id) {
            const call = peer.call(targetPeerId, stream);
            call.on('stream', (remoteStream) => {
                setRemoteStream(remoteStream);
            });
            console.log('My peer ID is: ' + id);
        });
        
    } else {
        peer.on('open', function(id) {
            peer.on('call', (call) => {
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    setRemoteStream(remoteStream);
                });    
            });
            console.log('My peer ID is: ' + id);
        });
    }
    return {
        peer,
        stream,
    };
}