// import { useState } from 'react'
// import './App.css'
// import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
// import Layout from './containers/Layout/Layout'

// import Home from './containers/Home/Home'
// import Notes from './containers/Notes/Notes'
// import Translator from './containers/Translator/Translator'
// import Login from './containers/Login/Login'
// import store from './config/store'
// import { Provider } from 'react-redux'
// import PopUp from './components/PopUp/PopUp'


// function App() {

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />
//     },
//     {
//       element: <Layout />,
//       children: [
//         {
//           path: "/home",
//           element: <Home />,
//           //deepseek changes
//           errorElement: <ErrorBoundary />,
//         },
//         // {
//         //   path: "/Chatbot",
//         //   element: <Chatbot />
//         // },
//         {
//           path: "/translator",
//           element: <Translator />
//         },
//         {
//           path: "/notes",
//           element: <Notes />
//         },
//         {
//           // deepseek changes
//           path: "/category/:category",
//           element: <CategoryBooks />
//         }
//       ]
//     },
    
//   ])


//   return (
//     <>
//       <Provider store={store}>
//         <RouterProvider router={router}>

//         </RouterProvider>
//       </Provider>
//     </>
//   )
// }

// export default App


import { useState, Suspense, lazy } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import Loader from './components/Loader/Loader'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import { Provider } from 'react-redux'
import store from './config/store'

const Home = lazy(() => import('./containers/Home/Home'))
const Notes = lazy(() => import('./containers/Notes/Notes'))
const Translator = lazy(() => import('./containers/Translator/Translator'))
const Login = lazy(() => import('./containers/Login/Login'))
const CategoryBooks = lazy(() => import('./containers/CategoryBooks/CategoryBooks'))

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorBoundary />
    },
    {
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/home",
          element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          )
        },
        {
          path: "/translator",
          element: (
            <Suspense fallback={<Loader />}>
              <Translator />
            </Suspense>
          )
        },
        {
          path: "/notes",
          element: (
            <Suspense fallback={<Loader />}>
              <Notes />
            </Suspense>
          )
        },
        {
          path: "/category/:category",
          element: (
            <Suspense fallback={<Loader />}>
              <CategoryBooks />
            </Suspense>
          )
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
