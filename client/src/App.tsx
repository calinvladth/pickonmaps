import 'leaflet/dist/leaflet.css'
import {Route, Routes} from "react-router-dom";
import Maps from "./pages/maps";
import Picks from "./pages/picks";
import Layout from "./components/layout";
import Middleware from "./pages/middleware";
import {PATHS} from "./utils/constants";
import User from "./pages/user";

function App() {
    return (
        <Routes>
            <Route path={PATHS.SIGNIN} element={<Layout.AuthLayout/>}>
                <Route index element={<User.SignIn/>}/>
                <Route path={PATHS.SIGNUP} element={<User.SignUp/>}/>
            </Route>
            <Route path={PATHS.MAPS_VIEW}
                   element={<Middleware.RequireAuth><Layout.MapLayout/></Middleware.RequireAuth>}>
                <Route index element={<Maps.MapsView/>}/>
                <Route path={PATHS.MAP_CREATE} element={<Maps.MapCreate/>}/>
                <Route path={PATHS.MAP_EDIT} element={<Maps.MapEdit/>}/>
                <Route path={PATHS.PICKS_VIEW} element={<Picks.PicksView/>}/>
                <Route path={PATHS.PICKS_CREATE} element={<Picks.PickCreate/>}/>
                <Route path={PATHS.PICK_VIEW} element={<Picks.PickView/>}/>
            </Route>
            <Route path={PATHS.ACCOUNT} element={<Middleware.RequireAuth><Layout.MapLayout/></Middleware.RequireAuth>}>
                <Route index element={<User.UserProfile/>}/>
            </Route>

            <Route path="*" element={<p>404</p>}/>
        </Routes>
    )
}

export default App
