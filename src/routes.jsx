import { createBrowserRouter, Navigate } from 'react-router'
import { AppShell } from '@/components/layout/AppShell'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import VerifyOtp from '@/pages/VerifyOtp'
import Dashboard from '@/pages/Dashboard'
import Policies from '@/pages/Policies'
import Claims from '@/pages/Claims'
import ClaimDetail from '@/pages/ClaimDetail'
import NewClaim from '@/pages/NewClaim'
import Payments from '@/pages/Payments'
import Notifications from '@/pages/Notifications'
import Services from '@/pages/Services'
import Feedback from '@/pages/Feedback'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'
import { FaqLayout } from '@/components/layout/FaqLayout'

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <SignUp /> },
  { path: '/verify-otp', element: <VerifyOtp /> },
  { path: '/faq', element: <FaqLayout /> },
  {
    path: '/claims/new',
    element: (
      <ProtectedRoute>
        <NewClaim />
      </ProtectedRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'policies', element: <Policies /> },
      { path: 'claims', element: <Claims /> },
      { path: 'claims/:id', element: <ClaimDetail /> },
      { path: 'payments', element: <Payments /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'services', element: <Services /> },
      { path: 'feedback', element: <Feedback /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
