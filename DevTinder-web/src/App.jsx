import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Feed from "./components/Feed.jsx"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import appStore from "./utils/appStore.js"
import { Provider } from 'react-redux';
function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Feed/>}>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
