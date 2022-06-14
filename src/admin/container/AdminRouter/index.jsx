import { Routes, Route } from "react-router-dom";
import BasicSetting from "../BasicSetting"
import HomeManagement from "../HomeManagement"

const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/setting' element={<BasicSetting/>} />
      <Route path='/' element={<HomeManagement/>} />
    </Routes>
  )
}
export default AdminRouter