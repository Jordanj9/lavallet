import React, {useEffect} from "react";
import axios from 'axios';
import ReactDOM from 'react-dom';
let pc:RTCPeerConnection;
let videoRef:any;

let doSignaling = (iceRestart:any) => {
    console.log({iceRestart});
    pc.createOffer({iceRestart})
        .then(offer => {
            console.log(offer);
            pc.setLocalDescription(offer)

            return axios.post(`http://localhost:8080/doSignaling`,JSON.stringify(offer));
        })
        .then(res => res.data)
        .then(res => {pc.setRemoteDescription(res); console.log(res)})
       // .catch(alert)
}
export class Camara extends React.Component<any, any> {
    componentDidMount(){
        pc = new RTCPeerConnection()
        pc.addTransceiver('video')

        pc.oniceconnectionstatechange = () => console.log(pc.iceConnectionState);
        pc.ontrack = function (event) {
            let el =document.createElement('video') as HTMLVideoElement;
            el.srcObject = event.streams[0];
            el.autoplay = true
            el.controls = true;
            const rootElement = document.getElementById("remoteVideos");
            ReactDOM.render(<video ref={audio => {videoRef = audio}} controls={true} autoPlay={true} style={{height:200}}></video>, rootElement);
            videoRef.srcObject=event.streams[0];
        }
        doSignaling(false);
    };
    render(){
      return(
          <div>
               <div id="remoteVideos">
                  </div>
          </div>
      );
    }
}
