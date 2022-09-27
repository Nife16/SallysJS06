import HomePage from './components/pages/HomePage';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<Login />} />
    </Routes>
  );
}

export default App;
