import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Details } from './pages/Details';
import { Home } from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/details/:code" element={<Details/>}></Route>
      </Route>
    </Routes>
  );
}
