import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedroute";



const RouterComponent = () =>{
    const authRoutes = [
        {path:"/login", element:},
        {path: "/signup ", element:}
    ]
    const inAppRoutes= [{path: "",element:}]

    return (
        <Routes>
      {authRoutes.map(({path, element}) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route element={<ProtectedRoute />}>
        {inAppRoutes.map(({path, element}) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
    )
}