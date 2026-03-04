import { lazy, Suspense, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Private from './feautures/app/routes/PublicRoute'
import Public from './feautures/app/routes/ProtectedRoute'
import { Route, RouterProvider } from 'react-router-dom'
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import RootLayout from './layouts/RootLayout'
import Wishlist from './pages/WishListPage'
import CategoryPage from './pages/ProductCategoryPage'
import SearchPage from './pages/SearchPage'
import CartPage from './pages/CartPage'
import AuthLayout from './layouts/AuthLayout'
import Spinner from './shared/components/loaders/Spinner'
import { refresh } from './feautures/auth/auth.api'
import { useAuthStore } from './feautures/auth/auth.store'

const Checkout = lazy(() => import('./pages/Checkout'))
const LoginPage = lazy(() => import('./pages/LoginPage'))


const App = () => { 
  const { logout, refreshToken, setTokens } = useAuthStore()

  useEffect(() => {
    const initializeAuth = async () => {
      // Edge case 1: No refresh token stored
      if (!refreshToken) {
        logout()
        return
      }
      try {
        // Call refresh endpoint to get new access token
        const data = await refresh(refreshToken);
        setTokens(data.accessToken, data.refreshToken)
        console.log('Token refreshed successfully:', data.accessToken)
      } catch (error: any) {
        // Edge case 2: Refresh token expired or invalid
        const message = error.response?.data?.message || 'Session expired'
        console.error('Token refresh failed:', message)
        logout()
      }
    }

    initializeAuth()
  }, [])
  
  const routes = createBrowserRouter(createRoutesFromElements(
     <Route>
      <Route element={<Private/>}>
      <Route element={<AuthLayout/>}>
        <Route path='/login' element={<Suspense fallback={<Spinner/>}><LoginPage/></Suspense>}/>
      </Route>
    </Route>
    <Route element={<Public/>}>
    <Route element={<RootLayout/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='wishlist' element={<Wishlist/>}/>
      <Route path='/search' element={<Suspense fallback={<Spinner/>}><SearchPage/></Suspense>}/>
      <Route path='/category/:categoryName' element ={<CategoryPage/>}/>
      <Route path ='/cart' element= {<CartPage/>}/>
      <Route path='/cart/checkout' element={<Suspense fallback={<Spinner/>}><Checkout/></Suspense>}/>
    </Route>
    </Route>
    </Route>
  ))

  return (
    <>
      <ToastContainer position="top-center"/>
      <RouterProvider router={routes}/>
      
    </>
  )
}

export default App