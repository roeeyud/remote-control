export default async function startStream(description) {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    const peerConnection = new RTCPeerConnection({});
    
    peerConnection.addEventListener('icecandidate', (event) => {
        console.log(`ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
    });
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    };
    const offer = await peerConnection.createOffer(offerOptions);
    await peerConnection.setLocalDescription(offer);
    console.log(`${offer} setLocalDescription complete`);
    return stream;
}