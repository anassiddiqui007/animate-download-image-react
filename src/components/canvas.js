import React,{Component} from 'react';

export default class Canvas extends Component{

  init = ()=>{
    //Creating Image element
    this.img = new Image();
    this.img.src = 'https://images.pexels.com/photos/2915997/pexels-photo-2915997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
    this.img.crossOrigin = 'anonymous';
    //Creating audio element from audio file
    this.audio = new Audio();
    this.audio.src = "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3";
    this.audio.crossOrigin = 'anonymous';
    //x movement parameters
    this.dx = 1;
    //Canvas
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  play = ()=>{
    this.init();
    //reset all timeouts when play button is clicked
    for(var i=0; i<100; i++){
      window.clearTimeout(i);
    };
    this.x=0;      //initializing starting position for image
    this.start = Date.now();   // initializing time
    this.animate();  //Start animation
    this.audio.pause();
    this.audio.currentTime = 0; //resetting the audio file to start
    this.audio.play();
    setTimeout(()=>this.audio.pause(), 5000);  //Stop audio after 5 seconds
    this.startRecording();  //Start Recording audio and canvas stream
  }

  startRecording = () =>{
    var frames = [];
    var canvasStream = this.canvas.captureStream();
    // var audioStream = this.audio.captureStream();
    // var audioTrack = audioStream.getAudioTracks()[0];
    // canvasStream.addTrack(audioTrack);
    var rec = new MediaRecorder(canvasStream);
    rec.ondataavailable = e => frames.push(e.data); //Push to frames array while recording
    rec.onstop = e => this.exportVid(new Blob(frames, {type: 'video/mp4'}));
    rec.start();  //Start recording (lag possible according to machine)
    setTimeout(()=>rec.stop(), 5000);   //Stop recording after 5 sec
  }

  exportVid = (blob) =>{
    //Clear Download section to avoid multiple download buttons
    document.getElementById('download-video').innerHTML = "";
    //Create Video Element
    var vid = document.createElement('video');
    vid.src = URL.createObjectURL(blob);
    vid.controls = true;
    //Create Download Link and append to the page
    var a = document.createElement('a');
    a.download = 'myvid.mp4';
    a.href = vid.src;
    a.textContent = 'Download';
    a.classList.add("btn");
    a.classList.add("btn-primary");
    document.getElementById('download-video').appendChild(a);
  }

  animate = () =>{

    this.x = (this.x - this.dx) % this.canvas.width;     //New x coordinate for image (Moving left)
    //image dimensions in canvas
    var imgWidthCanvas = this.img.width;
    var imgHeightCanvas = this.canvas.height;
    this.ctx.drawImage(this.img,this.x,0,imgWidthCanvas,imgHeightCanvas);
    if (Date.now()-this.start <= 5000){   //Animate for 5 sec
      requestAnimationFrame(this.animate);
    }
  }

  render(){
    return (
      <div className="container">
        <canvas id="canvas" width="640" height="480"></canvas>
        <br/>
        <button className="btn btn-default" onClick={this.play} type="button" name="button">Play</button>
        <span id="download-video"></span>
      </div>
    )
  }
}
