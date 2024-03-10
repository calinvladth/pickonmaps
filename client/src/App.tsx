import 'leaflet/dist/leaflet.css'
import {Col, ConfigProvider, Row} from "antd";
import Map from './components/map'
import MapForm from "./components/map-form";
import MapListPicks from "./components/map-list-picks";
import {useSelector} from "react-redux";
import {selectMap} from "./slices/mapSlice";
import PickerView from "./components/picker-view";

function App() {
    const {isEdit, isPickView} = useSelector(selectMap)
    return (
        <ConfigProvider
            theme={{
                components: {}
            }}
        >
            <Row gutter={24}>

                <Col span={8}>
                    {/*<LayerCategoryList/>*/}
                    {/*<PickerForm/>*/}
                    {/*<PickView/>*/}
                    {/*<UserProfile/>*/}
                    {isPickView && <PickerView/>}
                    {isEdit ? <MapForm/> : <MapListPicks/>}

                </Col>

                <Col span={16} style={{height: '100vh'}}>
                    <Map/>
                </Col>
            </Row>
        </ConfigProvider>
    )
}

export default App
