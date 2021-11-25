import './App.css'
import Header from './components/Header'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import ProductTable from './components/ProductTable'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/internal/produk">
          <ProductTable />
        </Route>
      </div>
    </BrowserRouter>
  )
}

export default App
