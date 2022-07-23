import { Routes, Route } from "react-router-dom";
import About from "../About";
import AboutEdit from "../AboutEdit";
import AddArticle from "../AddArticle";


import AddArticles from "../AddArticles";



import Article from "../Article";
import Articles from "../Articles";
import Say from "../Say";
import BasicSetting from "../BasicSetting"
import HomeManagement from "../HomeManagement"
import PageTest from "../PageTest";
import Link from "../Link";
import './index.css'

const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeManagement/>} />
      <Route path='/admin/test' element={<PageTest/>} />
      <Route path='/admin/link' element={<Link/>} />
      <Route path='/admin/say' element={<Say/>} />

      <Route path='/admin/AddArticle' element={<AddArticle/>} />
      <Route path='/admin/article' element={<Article/>} />

      <Route path='/admin/aboutEdit' element={<AboutEdit/>} />
      <Route path='/admin/about' element={<About/>} />

      <Route path='/articles' element={<Articles/>} />
      <Route path='/admin/AddArticles' element={<AddArticles/>} />

      <Route path='/setting' element={<BasicSetting/>} />

    </Routes>
  )
}
export default AdminRouter