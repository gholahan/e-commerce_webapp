import AnnouncementBar from "../shared/components/AnnouncmentBar"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "../shared/components/Footer"
import Navbar from "../shared/components/nav/Navbar"
import Breadcrumbs from "../shared/components/BreadCrumbs"
import ScrollToTop from "../shared/components/ScrollToTop"
const RootLayout = () => {
   const { pathname } = useLocation();

  const isHomePage = pathname === "/";
  const profilePage = pathname === '/profile'
  return (
    <>
     <AnnouncementBar/>
     <Navbar/>
     <ScrollToTop />
    <div className="flex flex-col">
     <main className='min-h-screen px-4 sm:px-[3vw] md:px-[5vw] lg:px-[7vw]'>
      {!isHomePage && !profilePage && <Breadcrumbs />}
      <Outlet/>
     </main>
     <Footer/>
    </div>
    </>
  )
}

export default RootLayout 