import HomePage from './components/pages/HomePage';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import AgentProfile from './components/pages/AgentProfile';
import { Routes, Route } from 'react-router-dom'
import Listings from './components/pages/Listings';



function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/agent-profile" element={<AgentProfile />} />
      <Route path="/listings" element={<Listings />} />
    </Routes>

  );
}

export default App;
