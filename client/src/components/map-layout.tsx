import {Col, ConfigProvider, Row} from "antd";
import Map from "./map";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../slices/userSlice";
import {useEffect} from "react";
import {PATHS} from "../utils/constants";

function MapLayout() {
    const {isAuthenticated, email} = useSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(PATHS.SIGNIN)
        }
    }, [isAuthenticated])


    return <ConfigProvider
        theme={{
            components: {}
        }}
    >
        <Row gutter={24}>

            <Col span={6}>
                <p>{email}</p>

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

export default MapLayout