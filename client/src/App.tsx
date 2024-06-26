import 'leaflet/dist/leaflet.css'
import {Route, Routes} from "react-router-dom";
import {PATHS} from "./utils/constants";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, userActions} from "./slices/userSlice";
import MapShareLayout from "./components/layout/map-share-layout/map-share-layout";
import {Layout} from "./components/layout";
import {Maps} from './pages/maps'
import {User} from "./pages/user";
import {Middleware} from "./pages/middleware";
import {Picks} from "./pages/picks";

function App() {
    const {isAuthenticated} = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(userActions.checkUser())
        }
    }, [dispatch, isAuthenticated])

    return (
        <Routes>
            <Route path={PATHS.SIGNIN} element={<Layout.AuthLayout/>}>
                <Route index element={<User.SignIn/>}/>
                <Route path={PATHS.SIGNUP} element={<User.SignUp/>}/>
            </Route>

            <Route path={PATHS.MAP_SHARE} element={<Layout.MapShareLayout/>}>
                <Route index element={<Maps.MapShare/>}/>
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
