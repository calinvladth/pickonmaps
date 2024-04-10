import 'leaflet/dist/leaflet.css'
import {Route, Routes} from "react-router-dom";
import Maps from "./pages/maps";
import Picks from "./pages/picks";
import Pick from "./pages/pick";
import CreatePick from "./pages/pick/create";
import CreateMap from "./pages/maps/create";
import EditMap from "./pages/maps/edit";
import {PATHS} from "./utils/constants";
import SignIn from "./pages/authentication/singnin";
import SignUp from "./pages/authentication/singup";
import UserProfile from "./pages/user-profile/user-profile";
import RequireAuth from "./components/require-auth";
import Layout from "./components/layout";

function App() {
    return (
        <Routes>
            <Route path={PATHS.SIGNIN} element={<Layout.AuthLayout/>}>
                <Route index element={<SignIn/>}/>
                <Route path={PATHS.SIGNUP} element={<SignUp/>}/>
            </Route>
            <Route path={PATHS.MAPS_VIEW} element={<RequireAuth><Layout.MapLayout/></RequireAuth>}>
                <Route index element={<Maps/>}/>
                <Route path={PATHS.MAP_CREATE} element={<CreateMap/>}/>
                <Route path={PATHS.MAP_EDIT} element={<EditMap/>}/>
                <Route path={PATHS.PICKS_VIEW} element={<Picks/>}/>
                <Route path={PATHS.PICKS_CREATE} element={<CreatePick/>}/>
                <Route path={PATHS.PICK_VIEW} element={<Pick/>}/>
            </Route>
            <Route path={PATHS.ACCOUNT} element={<RequireAuth><Layout.MapLayout/></RequireAuth>}>
                <Route index element={<UserProfile/>}/>
            </Route>

            <Route path="*" element={<p>404</p>}/>
        </Routes>
    )
}

export default App
