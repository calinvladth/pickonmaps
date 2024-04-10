import {Col, ConfigProvider, Row} from "antd";
import Map from "../map";
import {Link, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../../slices/userSlice";
import {PATHS} from "../../utils/constants";

function MapLayout() {
    const {email} = useSelector(selectUser)


    return <ConfigProvider
        theme={{
            components: {}
        }}
    >
        <Row gutter={24}>

            <Col span={6}>
                <Link to={PATHS.ACCOUNT}>Profile {email}</Link>

                <Outlet />
            </Col>

            <Col span={18} style={{height: '100vh', position: 'relative'}}>
                <Map/>
            </Col>
        </Row>
    </ConfigProvider>
}

export default MapLayout