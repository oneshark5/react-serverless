import { Routes, Route } from "react-router-dom";
import About from "../About";
import Articles from "../Articles";
import BasicSetting from "../BasicSetting"
import HomeManagement from "../HomeManagement"

const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/admin/about' element={<About/>} />
      <Route path='/articles' element={<Articles/>} />
      <Route path='/setting' element={<BasicSetting/>} />
      <Route path='/' element={<HomeManagement/>} />
    </Routes>
  )
}
export default AdminRouter