import 'leaflet/dist/leaflet.css'
import {Col, ConfigProvider, Row} from "antd";
import Map from './components/map'
import MapListPicks from "./components/map-list-picks";
import PickerView from "./components/picker-view";

function App() {
    return (
        <ConfigProvider
            theme={{
                components: {}
            }}
        >
            <Row gutter={24}>

                <Col span={6}>
                    <PickerView/>
                    <MapListPicks/>

                </Col>

                <Col span={18} style={{height: '100vh'}}>
                    <Map/>
                </Col>
            </Row>
        </ConfigProvider>
    )
}

export default App
