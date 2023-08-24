# Frontend Repo

## Getting the source code running

* Clone [`https://github.com/upsurgeindia/frontend.git`](https://github.com/upsurgeindia/frontend.git) repo.
* Use `git lfs install` after ensuring that git lfs is avilable on your local system
* Use `git lfs pull` to fetch LFS files
* Run `npm i --legacy-peer-deps` to install dependencies.
* Create `config/index.js` file in root.
* Copy the below code in `config/index.js`
* Create `firebase.js` file in  `src/` and copy the below code.

`config/index.js`
```
export const Servers = {
    LiveServer: "https://api.upsurgefi.com/",
    TestServer: "http://localhost:4000/",
  };
  
  export const GClientId = "";
  export const xoxotoken = "";
  export const apple_client_id = "";
  
  export const UniCoinValue = 1000;
  export const AWS_ACCESS_KEY = "";
  export const AWS_SECRET_ACCESS_KEY = "";
  export const AWS_BUCKET = "upsurge-public-games";
  export const WEBGL_BASE_URL = "https://game-test-liard.vercel.app";
  
```
`firebase.js`
```
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCdZWlbFJaRuk8JkSrhF_Egx3CAQUisir4",
  authDomain: "upsurge-test-mess.firebaseapp.com",
  projectId: "upsurge-test-mess",
  storageBucket: "upsurge-test-mess.appspot.com",
  messagingSenderId: "30765979142",
  appId: "1:30765979142:web:656dbe79596601dea21587",
};

const app = initializeApp(firebaseConfig);

export default app;

```




## CSS breakpoints pages & recommended 

### Small screen

@media only screen and (max-width: 500px)

### Medium screen

@media only screen and (min-width: 501px) and (max-width: 990px)

### Large screen

@media only screen and (min-width: 991px) and (max-width: 1300px)


![Visualization of this repo](./diagram.svg)
