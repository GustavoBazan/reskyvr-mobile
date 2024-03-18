import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    /* YOUR FIREBASE CONFIG HERE */
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
  
const firestore = firebase.firestore();

const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.1.google.com:19302",
          "stun:stun2.1.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

interface ConnectionCode {
    code: string;
}

const FirebaseConnection: React.FC<ConnectionCode> = ({ code }) => {

    pc.ontrack = (event) => {

        const video:HTMLVideoElement = document.createElement("video");
        document.getElementById("streamVideos")?.appendChild(video);
        const stream = new MediaStream();
  
        event.streams[0].getTracks().forEach((track) => {
          stream.addTrack(track);
        });
        
        video.className = 'remoteStreamVideo';
        video.srcObject = stream;
        video.play();
  
    };

    async function connect() {

        const callDoc = firestore.collection("calls").doc(code);
        const offerCandidates = callDoc.collection("offerCandidates");
        const answerCandidates = callDoc.collection("answerCandidates");

        pc.onicecandidate = (event) => {

            event.candidate &&
                answerCandidates.add(event.candidate.toJSON());
        };

        const callData = (await callDoc.get()).data();

        const offerDescription = (callData as any).offer;
        await pc.setRemoteDescription(
            new RTCSessionDescription(offerDescription)
        );

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await callDoc.update({ answer });

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                };
            });
        });
    };

    connect();

    return (

        <div id="streamVideos">

        </div>

    );

};

export default FirebaseConnection;