import React from "react";
import axios from 'axios';
import ReactDOM from 'react-dom';
let pc:RTCPeerConnection;
let videoRef:any;
let canvasElement:any;
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
export function takePhoto(){
  const video = videoRef;
  ReactDOM.render(<canvas ref={canvas=>canvasElement=canvas} style={{height:200}}></canvas>, document.getElementById("canvas"));
  // scale the canvas accordingly
  canvasElement.width = video.videoWidth;
  canvasElement.height = video.videoHeight;
  // draw the video at that frame
  canvasElement.getContext('2d')
  .drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  // convert it to a usable data URL
  //this dataURL can be storage on dataBase to reDraw the image
  const dataURL = canvasElement.toDataURL();
  return dataURL;
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

    constructor(props: any) {
      super(props);
      videoRef = React.createRef();

  }
    render(){
      return(
        <div className="flex justify-center">

            <div className="md:w-1/2" id="remoteVideos"></div>
            <div className="md:w-1/2" id="canvas">
            </div>
        </div>

      );
    }
}