let videofeed;
let posenet;
let poses = [];
let started = false;
//p5.js
function setup(){
    const canvas = createCanvas(500,500);
    canvas.parent("video");

    //video 
    videofeed = createCapture(VIDEO);
    videofeed.size(width, height);
    posnet = ml5.poseNet(video);

    posenet.on("pose", function(results) {
        poses = results;
    }
    );

    videofeed.hide();
    noLoop();
}

function draw(){
    image(videofeed,0,0,width,height);
}

function start(){
    select("#startstop").html("stop");
    document.getElementById("startstop").addEventListener("click", stop);
    started = true;
    loop();
}

function stop(){
    select("#startstop").html("start");
    document.getElementById("startstop").addEventListener("click", start);
    removeblur();
    started = false;
    loop();
}

var rightEye, leftEye, 
defaultRightEyePosition = [], 
defaultLeftEyePosition = [];

function calEyes(){

    for( let i=0; i<poses.length; i++){

        let cyreentpose = poses[i].pose;
        for(j=0; j<poses.keypoints.length; j++){

            let keypoint = pose.keypoint[j];
            rightEye = pose.keypoints[2].position;
            leftEye = pose.keypoints[1].position;

            while (defaultRightEyePosition.length<1){
                defaultRightEyePosition.push(rightEye.y);

            }
            
            while (defaultLeftEyePosition.length<1){

                defaultLeftEyePosition.push(leftEye.y);
            }

            if(Math.abs(rightEye.y - defaultRightEyePosition.y[0]) >20)
                 {
                    blur();
                }

                if(Math.abs(rightEye.y - defaultRightEyePosition.y[0]) <=20)
                {
                   removeblur();
               }

                
        }
    }

}

function blur(){
    document.body.style.filter = "blur(5px)";
    document.style.transition = "1s";
}

function removeblur(){
    document.body.style.filter = "blur(0px)";
    document.style.transition = "1s";
}