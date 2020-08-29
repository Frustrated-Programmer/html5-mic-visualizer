let mic = new Mic();
let h = document.getElementById("header");
let canvasANDshape = document.getElementById('canvasANDshape');
let canvasANDshapeCTX = canvasANDshape.getContext("2d");
let canvasANDimage = document.getElementById('canvasANDimage');
let canvasANDimageCTX = canvasANDimage.getContext("2d");
let canvasANDvideo = document.getElementById('canvasANDvideo');
let canvasANDvideoCTX = canvasANDvideo.getContext("2d");
let hiddenVideo = document.getElementById('hiddenVideo');
let image = document.getElementById('image');
let seconds = 0;
let img = new Image();
img.src = "./circle.png";
image.style.height = "0px";
image.style.display = "";
image.style.width = "100px";
mic.onDBChange = function(DB){
    h.innerHTML = Math.round(DB) + " dB";
    canvasANDshapeCTX.clearRect(0, 0, canvasANDshape.width, canvasANDshape.height);
    canvasANDimageCTX.clearRect(0, 0, canvasANDimage.width, canvasANDimage.height);
    canvasANDshapeCTX.fillRect(50,100-(DB*0.5),100,DB);
    canvasANDimageCTX.drawImage(img,50,100-(DB*2),100,(DB*4));
    image.style.height = DB*3+"px";
    //MAX = 2.88 | MIN = 0;
    //DB = 40    | DB = 0;
    hiddenVideo.currentTime = 2.88 - (DB / 13.888);
    canvasANDvideoCTX.drawImage(hiddenVideo,0,0,200,200);
};
mic.onFrequency = function(frequencyArray){
    let adjustedLength;
    for(let i = 0; i < 255; i++){
        adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
        paths[i].setAttribute("d", "M " + (i) + ",255 l 0,-" + adjustedLength);
    }
};
var paths = document.getElementsByTagName("path");
var visualizer = document.getElementById("visualizer");
var mask = visualizer.getElementById("mask");
document.getElementById("button").onclick = function(){
    mic.start();
    if(!mic.started){

        this.innerHTML = "<span class='fa fa-play'></span>Start Listen";
        this.className = "green-button";
    }
    else{
        h.innerHTML = "Listening";
        visualizer.setAttribute("viewBox", "0 0 255 255");
        let path;
        for(var i = 0; i < 255; i++){
            path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("stroke-dasharray", "4,1");
            mask.appendChild(path);
        }
        this.innerHTML = "<span class='fa fa-stop'></span>Stop Listen";
        this.className = "red-button";
    }
};
