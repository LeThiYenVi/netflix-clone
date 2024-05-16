import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MovieManagement from "./pages/movie-management";
import HomePage from "./pages/home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/movie-management",
      element: <MovieManagement />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
