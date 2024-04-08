import 'leaflet/dist/leaflet.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import Maps from "./pages/maps";
import Picks from "./pages/picks";
import Pick from "./pages/pick";
import CreatePick from "./pages/pick/create";
import CreateMap from "./pages/maps/create";
import EditMap from "./pages/maps/edit";
import {PATHS} from "./utils/constants";

function App() {
    return (
        <>
            <Routes>
                <Route path={PATHS.MAPS_VIEW} element={<Layout/>}>
                    <Route index element={<Maps/>}/>
                    <Route path={PATHS.MAP_CREATE} element={<CreateMap/>}/>
                    <Route path={PATHS.MAP_EDIT} element={<EditMap/>}/>
                    <Route path={PATHS.PICKS_VIEW} element={<Picks/>}/>
                    <Route path={PATHS.PICKS_CREATE} element={<CreatePick/>}/>
                    <Route path={PATHS.PICK_VIEW} element={<Pick/>}/>

                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    <Route path="*" element={<p>404</p>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
