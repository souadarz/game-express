import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Unauthorized from './pages/Unauthorized';
import Layout from './components/Layout';
import { DashboardProvider } from './context/DashboardContext';
import { ProductProvider } from './context/ProductContext';
import Products from './pages/Products';
import ProductDetail from './pages/productDetails';


function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />


              <Route element={<AuthRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

              </Route>
              <Route path="Products" element={
                // <ProductProvider>
                <Products />
                // </ProductProvider>
              } />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="unauthorized" element={<Unauthorized />} />

              {/* Protected routes */}
              <Route
                element={
                  <ProtectedRoute roles={["product_manager", "super_admin"]} />
                }
              >
                <Route
                  path="dashboard"
                  element={
                    <DashboardProvider>
                      <Dashboard />
                    </DashboardProvider>
                  }
                />
              </Route>

              <Route element={<ProtectedRoute roles={['super_admin']} />}>
                <Route path="categories" element={<div>Categories Management</div>} />
              </Route>

              {/* <Route element={<ProtectedRoute roles={['product_manager', 'super_admin']} />}>
              <Route path="products" element={<div>Products Management</div>} />
            </Route> */}
            </Route>
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;