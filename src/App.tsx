import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './module/Layout';
import UserForm from './module/User/UserForm';
import UserList from './module/User/UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<UserList />}></Route>
          <Route path='/user/register' element={<UserForm />}></Route>
          <Route path='/user/update' element={<UserForm />}></Route>
          <Route path='/user/edit/:id' element={<UserForm isEditForm={true} />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
