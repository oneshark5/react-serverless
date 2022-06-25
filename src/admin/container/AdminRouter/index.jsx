import { Routes, Route } from "react-router-dom";
import About from "../About";
import AboutEdit from "../AboutEdit";
import Articles from "../Articles";
import BasicSetting from "../BasicSetting"
import HomeManagement from "../HomeManagement"
import './index.css'

const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/admin/aboutEdit' element={<AboutEdit/>} />
      <Route path='/admin/about' element={<About/>} />
      <Route path='/articles' element={<Articles/>} />
      <Route path='/setting' element={<BasicSetting/>} />
      <Route path='/' element={<HomeManagement/>} />
    </Routes>
  )
}
export default AdminRouter