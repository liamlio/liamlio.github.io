  let net;

  async function app() {
      console.log('loading mobilenet..');

      //load the model.
      net = await mobilenet.load();
      console.log('Succesfully loaded model');

      //make a prediction through the model on our image.
      const imgEl = document.getElementById('img');
      const result = await net.classify(imgEl);
      console.log(result);
  }