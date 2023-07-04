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
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  });

  const loadUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    });
  }


  const onInputChange = (event) => {
    setInput(event.target.value);
  }


  const calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    if (image && data.outputs && data.outputs.length > 0 && data.outputs[0].data.regions && data.outputs[0].data.regions.length > 0) {
      const width = Number(image.width);
      const height = Number(image.height);
      const region = data.outputs[0].data.regions[0];
      if (region.region_info && region.region_info.bounding_box) {
        const boundingBox = region.region_info.bounding_box;
        const leftCol = boundingBox.left_col * width;
        const topRow = boundingBox.top_row * height;
        const rightCol = (1 - boundingBox.right_col) * width;
        const bottomRow = (1 - boundingBox.bottom_row) * height;
        const concepts = region.data.concepts[0];
        return {
          leftCol: leftCol,
          topRow: topRow,
          rightCol: rightCol,
          bottomRow: bottomRow,
          name: concepts.name,
          per: concepts.value
        };
      }
    }
    return null;
  }

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "omriif5",
        "app_id": "celebs-detection"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key faa8105ee401465c9966e060863f643f'
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(`https://api.clarifai.com/v2/models/celebrity-face-detection/versions/2ba4d0b0e53043f38dbbed49e03917b6/outputs`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser(prevState => ({
                ...prevState,
                entries: count
              }));
            })
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(result))
      })
      .catch(error => console.log('error', error));

  };

  const handleLogout = () => {
    // Reset user state to initial values
    setImageUrl("");
    setUser({
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
    });
    setBox({});

  };

  const onRouteChange = (route) => {
    if (route === 'signin') {
      handleLogout();
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} color='#D4AF37' />
      {route === "home" ?
        <div>
          <Navigation onRouteChange={onRouteChange} />
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
        : (
          route === "signin"
            ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
            : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }

    </div>
  );
}

export default App;
