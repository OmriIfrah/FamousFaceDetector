import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");

  const onInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  }

  const calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    

    const concepts = data.outputs[0].data.regions[0].data.concepts[0];
    const region = data.outputs[0].data.regions[0];
    console.log(width, height);
    // Access the bounding box coordinates
    const boundingBox = region.region_info.bounding_box;
    console.log(data.outputs[0].data.regions[0].data.concepts);

    return {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: (1 - boundingBox.right_col) * width,
      bottomRow: (1 - boundingBox.bottom_row) * height,
      name: concepts.name,
      per: concepts.value
    }
  }

  const displayFaceBox = (box1) => {
    setBox(box1);
    console.log("box: ", box);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    // URL of image to use. Change this to your image.

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "omriif5",
        "app_id": "celebs-detection"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": imageUrl
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + 'faa8105ee401465c9966e060863f643f'
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(`https://api.clarifai.com/v2/models/celebrity-face-detection/versions/2ba4d0b0e53043f38dbbed49e03917b6/outputs`, requestOptions)
      .then(response => response.json())
      .then(result => displayFaceBox(calculateFaceLocation(result)))
      .catch(error => console.log('error', error));


  };

  const onRouteChange = (word) => {
    console.log(word);
    setRoute(word);
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      {route === "home" ?
        <div>
          <Navigation onRouteChange={onRouteChange} />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
        : (route === "signin" ? <Signin onRouteChange={onRouteChange} /> :
          <Register onRouteChange={onRouteChange} />)
      }

    </div>
  );
}

export default App;
