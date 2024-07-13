import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NoPage from './pages/NoPage'
import AddItem from './pages/Items/AddItem'
import AdminAnalytics from './pages/Admin/Analytics'
import AdminUsers from './pages/Admin/Users'
import Cart from './pages/Cart'
import Catlog from './pages/Catlog'
import EditItem from './pages/Items/EditItem'
import ItemPage from './pages/Items/ItemPage'
import Login from './pages/User/Login'
import Register from './pages/User/Regeister'
import Profile from './pages/User/Profile'
function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="admin/analytics" element={<AdminAnalytics />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="cart" element={<Cart />} />
            <Route path="catalog" element={<Catlog />} />
            <Route path="edit-item/:id" element={<EditItem />} />
            <Route path="item/:id" element={<ItemPage />} />
            <Route path="item" element={<ItemPage />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>

        

    </div>
  );
}

export default App;
