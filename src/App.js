
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import UserRoles from './components/UserRoles';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';


function App() {

  const ROLES = {
    'User': 55,
    'Editor' : 56,
    'Admin' : 54
  }

  

  return (
   
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}

        {/* <Route element={<PersistLogin />}> */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User,ROLES.Admin]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.User,ROLES.Admin]} />}>
            <Route path="/usersroles" element={<UserRoles />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        {/* </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    
  );
}

export default App;
