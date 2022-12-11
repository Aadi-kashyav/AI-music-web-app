song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;    
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("Music 2.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500);

    song1_status = "";
    song2_status = "";

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2){

    circle(leftWristX,leftWristY,20);
    song1.setVolume(1);
    song2.stop();
    if(song1.isPlaying() == false){
        song1_status = "set";
        song1.play();
        document.getElementById("song_name").innerHTML = "Industry baby";
    }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song2.setVolume(1);
        song1.stop();
        song2.play();
        if(song2.isPlaying() == false){
            song2_status = "set";
            song2.play();
            document.getElementById("song_name").innerHTML = "Let me down slowly";
        }
    }
}
function modelLoaded(){
    console.log('Posenet is Initialized')
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristx = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristx = " + rightWristX + "rightWristY = " + rightWristY);
    }
}