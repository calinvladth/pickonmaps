import {Style} from './map-share-layout.styled'
import {Outlet} from "react-router-dom";

//TODO: Remove this
function MapShareLayout() {
    return <Style.Container>

        <Outlet/>

    </Style.Container>
}

export default MapShareLayout