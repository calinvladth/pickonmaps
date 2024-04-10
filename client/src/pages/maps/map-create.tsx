import {Breadcrumb, Button, Input, Space} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {onMapEdit, saveMap, selectMaps} from "../../slices/mapsSlice";
import {useEffect} from "react";
import {generalActions, selectGeneral} from "../../slices/generalSlice";
import {PATHS} from "../../utils/constants";

function MapCreate() {
    const navigate = useNavigate()
    const {map} = useSelector(selectMaps)
    const {markerPosition} = useSelector(selectGeneral)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(generalActions.onCreate(true))
        return () => {
            dispatch(generalActions.onCreate(false))
        }
    }, [dispatch])

    function handleSubmit() {
        dispatch(saveMap({map: {...map, ...markerPosition}, cb: () => {navigate(PATHS.MAPS_VIEW)}}))
    }

    return <>
        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={PATHS.MAPS_VIEW}>Maps</Link>,
                    },
                    {
                        title: map.name || 'Create map'
                    }
                ]}
            />

            <Input placeholder="Map Name" value={map.name}
                   onChange={e => dispatch(onMapEdit({
                       name: e.target.value
                   }))}/>
            <Button onClick={handleSubmit}>Submit</Button>
        </Space>
    </>
}

export default MapCreate