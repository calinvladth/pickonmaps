import 'leaflet/dist/leaflet.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import Maps from "./pages/maps";
import Picks from "./pages/picks";
import Pick from "./pages/pick";
import CreatePick from "./pages/pick/create";
import CreateMap from "./pages/maps/create";
import EditMap from "./pages/maps/edit";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Maps/>}/>
                    <Route path="create" element={<CreateMap/>}/>
                    <Route path=":mapId" element={<EditMap/>}/>
                    <Route path=":mapId/picks" element={<Picks/>}/>
                    <Route path=":mapId/picks/create" element={<CreatePick/>}/>
                    <Route path=":mapId/picks/:pickId" element={<Pick/>}/>

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
