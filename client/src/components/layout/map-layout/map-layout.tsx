import {Avatar, Col, ConfigProvider, Dropdown, MenuProps, Row} from "antd";
import Map from "../../map";
import {Link, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, signOut} from "../../../slices/userSlice";
import {PATHS} from "../../../utils/constants";
import {Style} from './map-layout.styled'
import {UserOutlined} from "@ant-design/icons";


function MapLayout() {
    const {email} = useSelector(selectUser)
    const dispatch = useDispatch()

    const items: MenuProps['items'] = [
        {key: 1, label: <Link to={PATHS.ACCOUNT}>Profile</Link>},
        {key: 2, label: 'Logout'}
    ]

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === '2') {
            dispatch(signOut())
        }
    };


    return <Style.Container>
        <Style.Content>
            <Style.Avatar>
                <Link to={PATHS.ACCOUNT}>
                    <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomLeft">
                        <Avatar icon={<UserOutlined/>}/>
                    </Dropdown>
                </Link>
            </Style.Avatar>

            <Outlet/>
        </Style.Content>
        <Style.Component>
            <Map/>
        </Style.Component>
    </Style.Container>

    return <ConfigProvider
        theme={{
            components: {}
        }}
    >
        <Row gutter={24}>

            <Col span={6}>
                <Link to={PATHS.ACCOUNT}>Profile {email}</Link>

                <Outlet/>
            </Col>

            <Col span={18} style={{height: '100vh', position: 'relative'}}>
                <Map/>
            </Col>
        </Row>
    </ConfigProvider>
}

export default MapLayout