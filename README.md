<body>
  <h1>Yous Academy</h1>
  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#firebase-setup">Firebase Setup</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#available-scripts">Available Scripts</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ul>
  <h2 id="installation">Installation</h2>
  <ol>
    <li>Clone the repository:</li>
    <pre><code>git clone https://github.com/your-username/yous-academy.git
cd yous-academy
    </code></pre>
    <li>Install the dependencies:</li>
    <pre><code>
    npm install react-router-dom
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install redux react-redux
npm install @reduxjs/toolkit react-redux
npm install uuid
npm install firebase
npm install -g firebase-tools
    </code></pre>
    <li>Configure Firebase:</li>
    <ul>
      <li>Login to Firebase:</li>
      <pre><code>firebase login
      </code></pre>
      <li>Initialize Firebase in your project:</li>
      <pre><code>firebase init
firebase init hosting
</code></pre>
</ul>
  </ol>
  <h2 id="project-structure">Project Structure</h2>
  <p>Here's an overview of the project structure:</p>
  <pre><code>Yous Academy/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── Redux/
│   ├── scene/
│   ├── firebaseConfig.js
│   ├── App.js
│   ├── index.js
│   └── Navbar.css
├── .gitignore
├── firebase.json
├── package.json
└── README.md
  </code></pre>
  <h2 id="usage">Usage</h2>
  <p>To start the development server, run:</p>
  <pre><code>npm start
  </code></pre>
  <p>Navigate to <code>http://localhost:3000</code> in your browser to see the application in action.</p>
  <h2 id="firebase-setup">Firebase Setup</h2>
  <ol>
    <li>Create a Firebase project in the <a href="https://console.firebase.google.com/">Firebase Console</a>.</li>
    <li>Copy the Firebase configuration and paste it into <code>firebaseConfig.js</code>:</li>
    <pre><code>// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_STORAGE_BUCKET",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID",
measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
</code></pre>

  </ol>
  <h2 id="deployment">Deployment</h2>
  <ol>
    <li>Build the application:</li>
    <pre><code>npm run build
    </code></pre>
    <li>Deploy to Firebase Hosting:</li>
    <pre><code>firebase deploy
    </code></pre>
  </ol>
  <p>You can view the deployed application at <a href="https://fir-frontend-7d4bd.web.app/">https://fir-frontend-7d4bd.web.app/</a>.</p>

  <h2 id="available-scripts">Available Scripts</h2>
  <p>In the project directory, you can run:</p>
  <ul>
    <li><code>npm start</code>: Runs the app in development mode.</li>
    <li><code>npm run build</code>: Builds the app for production.</li>
    <li><code>firebase deploy</code>: Deploys the app to Firebase Hosting.</li>
  </ul>
  <h2 id="contributing">Contributing</h2>
  <p>Contributions are welcome! Please open an issue or submit a pull request to contribute to the project.</p>
  <h2 id="license">License</h2>
  <p>This project is licensed under the MIT License.</p>
  <hr>
  <h3>App Component</h3>
  <pre><code>// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './scene/Home';
import LoginForm from './scene/LoginForm';
import SignUpForm from './scene/SignUpForm';
import Cart from './scene/Cart';
import Payment from './scene/Payment';
import MyCourses from './scene/MyCourses';
import VideoPage from './scene/VideoPage';
import NoPage from './NoPage';

function App() {
return (
&lt;&gt;
&lt;Routes&gt;
&lt;Route path="/" element=&lt;Home /&gt; /&gt;
&lt;Route path="/login" element=&lt;LoginForm /&gt; /&gt;
&lt;Route path="/signup" element=&lt;SignUpForm /&gt; /&gt;
&lt;Route path="/home" element=&lt;Home /&gt; /&gt;
&lt;Route path="/cart" element=&lt;Cart /&gt; /&gt;
&lt;Route path="/payment" element=&lt;Payment /&gt; /&gt;
&lt;Route path="/mycourses" element=&lt;MyCourses /&gt; /&gt;
&lt;Route path="/video/:courseId" element=&lt;VideoPage /&gt; /&gt;
&lt;Route path="\*" element=&lt;NoPage /&gt; /&gt;
&lt;/Routes&gt;
&lt;/&gt;
);
}

export default App;
</code></pre>

  <footer>
    <p>Feel free to customize this README and the project as needed. Happy coding!</p>
  </footer>
</body>
</html>
