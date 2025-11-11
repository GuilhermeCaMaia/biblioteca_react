import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './home/Homepage';
import Navbar from './navbar/Navbar';
import Autor from './autor/Autor';
import Livro from './livro/Livro';



function App() {
  // Objeto produto
  // const autor = {
  //   name : '',
  //   nationality : ''
  // }
  
  // useState
  // const [btnCadastrar, setBtnCadastrar] = useState(true);
  

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/autor' element={<Autor />}/>
        <Route path='/livro' element={<Livro />}/>
        <Route path='*' element={<h1>Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
