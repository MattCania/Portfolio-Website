import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import ProfilePage from "./pages/Profile";
import MouseEffect from "./pages/MouseEffect";

function App() {

  return (
      <div
        className='flex flex-col justify-start items-center w-auto h-auto bg-zinc-950 overflow-hidden'
      >
          {/* <MouseEffect circleCount={100} circlePx={5} lerp={0.5} color={'black'} /> */}
          <ProfilePage/>
      </div>
  )
}

export default App
