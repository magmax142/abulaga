Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
}
);

Webcam.attach('#camera');

function TakePic(){
    Webcam.snap(function(cam_pic){
    document.getElementById("result").innerHTML='<img id="pic" src="'+cam_pic+'">';    
    });
}
model=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/U1wcuXA0g/model.json",modelLoaded);
function modelLoaded(){
    console.log("model loaded successfully");
}
var prediction1="";
var prediction2="";
function speak(){
    speakData1="THE PREDICTION 1 IS "+prediction1;
    speakData2="AND THE PREDICTION 2 IS "+prediction2;
    speak_audio=new SpeechSynthesisUtterance(speakData1+speakData2);
    window.speechSynthesis.speak(speak_audio);
}
function IdentifyPic(){
    img= document.getElementById('pic');
    model.classify(img, gotResult)
}
function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("emotionName1").innerHTML=prediction1
        document.getElementById("emotionName2").innerHTML=prediction2
    speak();
    if(prediction1 == "happy"){
        document.getElementById("emoji1").innerHTML= "&#128522;";
    }
    if(prediction1 == "sad"){
        document.getElementById("emoji1").innerHTML= "&#128532;";
    }
    if(prediction1 == "angry"){
        document.getElementById("emoji1").innerHTML= "&#128548;";
    }
    if(prediction2 == "happy"){
        document.getElementById("emoji2").innerHTML= "&#128522;";
    }
    if(prediction2 == "sad"){
        document.getElementById("emoji2").innerHTML= "&#128532;";
    }
    if(prediction2 == "angry"){
        document.getElementById("emoji2").innerHTML= "&#128548;";
    }
    } 
}