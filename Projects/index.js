let net;
const webcamElement = document.getElementById("webcam")


async function app() {
    console.log('loading mobilenet..');

    //load the model.
    net = await mobilenet.load();
    console.log('Succesfully loaded model');

    //make a prediction through the model on a continous image from our webcam.
    await setUpWebcam();
    while (true) {
        const result = await net.classify(webcamElement)
    
    document.getElementById('console').innerText =` 
    prediction: ${result[0].className}\n
    probability: ${result[0].probability}`;

    //To clearify that it should wait untill the next frame in order to predict again
    await tf.nextFrame();  
    }
}

async function setUpWebcam() {
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedial;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true},
                stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata', () => resolve(), false);   
                },
                error => reject());
        } else {
            reject();
        }
    });
}
app();