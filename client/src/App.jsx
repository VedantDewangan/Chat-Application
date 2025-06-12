import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Search from './pages/Search/Search'
import Request from './pages/request/Request'
import Chat from './pages/chat/Chat'
import Update from './pages/update/Update'
import PersonalChat from './pages/personalChat/PersonalChat'
import Group from './pages/group/Group'
import GroupDetails from './pages/groupDetails/GroupDetails'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<PublicRoute>
        <Login />
      </PublicRoute>} />
      <Route path='/signup' element={<PublicRoute>
        <Signup />
      </PublicRoute>} />
      <Route path='/' element={<PrivateRoute>
        <Home />
      </PrivateRoute>} />
      <Route path='/search' element={<PrivateRoute>
        <Search />
      </PrivateRoute>} />
      <Route path='/request' element={<PrivateRoute>
        <Request />
      </PrivateRoute>} />
      <Route path='/chats' element={<PrivateRoute>
        <Chat />
      </PrivateRoute>} />
      <Route path='/update' element={<PrivateRoute>
        <Update />
      </PrivateRoute>} />
      <Route path='/chat/:id' element={<PrivateRoute>
        <PersonalChat />
      </PrivateRoute>} />
      <Route path='/create/group' element={<PrivateRoute>
        <Group />
      </PrivateRoute>} />
      <Route path='/group/:id' element={<PrivateRoute>
        <GroupDetails />
      </PrivateRoute>} />
    </Routes>
    </BrowserRouter>
  )
}
