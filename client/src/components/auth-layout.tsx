import React, {useEffect} from "react";
import {Col, ConfigProvider, Flex, Row} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser} from "../slices/userSlice";
import {PATHS} from "../utils/constants";

function AuthLayout() {
    const {isAuthenticated} = useSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate(PATHS.MAPS_VIEW)
        }
    }, [isAuthenticated])

    return <ConfigProvider
        theme={{
            components: {}
        }}
    >
        <Flex gap="middle" justify="center" align="center" style={{width: '100%', height: '100vh'}}>
            <Outlet/>
        </Flex>
    </ConfigProvider>
}

export default AuthLayout