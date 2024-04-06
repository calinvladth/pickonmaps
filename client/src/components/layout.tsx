import {Col, ConfigProvider, Row} from "antd";
import Map from "./map";
import {Outlet} from "react-router-dom";

function Layout() {
    return <ConfigProvider
        theme={{
            components: {}
        }}
    >
        <Row gutter={24}>

            <Col span={6}>

                <Outlet />

                {/*<PickerView/>*/}
                {/*<MapListPicks/>*/}

            </Col>

            <Col span={18} style={{height: '100vh', position: 'relative'}}>
                <Map/>
            </Col>
        </Row>
    </ConfigProvider>
}

export default Layout