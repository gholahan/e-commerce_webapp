import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import PublicRoute from "./feautures/app/routes/PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import Wishlist from "./pages/WishListPage";
import CategoryPage from "./pages/ProductCategoryPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import AuthLayout from "./layouts/AuthLayout";
import Spinner from "./shared/components/Spinner";
import { refresh } from "./feautures/auth/auth.api";
import { useAuthStore } from "./feautures/auth/auth.store";
import Authloader from "./feautures/auth/component/Authloader";
import ProfilePage from './pages/ProfilePage'
import ProfileForm from "./pages/ProfileForm";
import AddressBook from "./pages/AddressBook";
import PaymentOptions from "./pages/PaymentOptions";
import NotFound from "./pages/NotFound";
const Checkout = lazy(() => import("./pages/Checkout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

   const routes = createBrowserRouter(createRoutesFromElements(
     <Route>
      <Route element={<PublicRoute/>}>
      <Route element={<AuthLayout/>}>
        <Route path='/login' element={<Suspense fallback={<Spinner/>}><LoginPage/></Suspense>}/>
      </Route>
    </Route>
    {/* <Route element={<ProtectedRoute/>}> */}
      <Route element={<RootLayout/>}>
        <Route path='/' element={<HomePage/>}/>
        <Route path='wishlist' element={<Wishlist/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/category/:categoryName' element ={<CategoryPage/>}/>
        <Route path ='/cart' element= {<CartPage/>}/>
        <Route path='/cart/checkout' element={<Suspense fallback={<Spinner/>}><Checkout/></Suspense>}/>
          <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<ProfileForm />} />
            <Route path="address" element={<AddressBook />} />
            <Route path="payment" element={<PaymentOptions />} />
        </Route>
        <Route path='*' element={<NotFound/>}/>
        </Route>
      </Route>
    // </Route>
  ))

const App = () => {
  const { logout, refreshToken, setTokens } = useAuthStore();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {

      if (!navigator.onLine) {
        setAuthReady(true);
        return;
      }

      if (!refreshToken) {
        logout();
        setAuthReady(true);
        return;
      }

      try {
        const data = await refresh(refreshToken);
        setTokens(data.accessToken, data.refreshToken);
      } catch (error: any) {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          logout();
        } else {
          console.error("Unexpected refresh error:", error);
        }
      }

      setAuthReady(true);
    };

    initializeAuth();
  }, []);

  if (!authReady) {
    return <Authloader/>;
  }

  return (
    <>
      <ToastContainer position="top-center" limit={1}/>
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
