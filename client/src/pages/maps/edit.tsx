import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {generalActions, onEdit, selectGeneral} from "../../slices/generalSlice";
import {useDispatch, useSelector} from "react-redux";
import {Breadcrumb, Button, Input, Space} from "antd";
import {onMapEdit, saveMap, selectMaps} from "../../slices/mapsSlice";
import replaceKeysInUrl from "../../utils/replace-keys-in-url";
import {PATHS} from "../../utils/constants";

function EditMap() {
    const navigate = useNavigate()
    const {mapId} = useParams()
    const {map} = useSelector(selectMaps)
    const {markerPosition} = useSelector(selectGeneral)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(onEdit(true))
        dispatch(generalActions.getMap(mapId))

        return () => {
            dispatch(onEdit(false))
        }
    }, [dispatch, mapId])

    function handleSubmit() {
        dispatch(saveMap({
            map: {...map, ...markerPosition}, cb: () => {
                navigate(replaceKeysInUrl({keys: {mapId}, url: PATHS.PICKS_VIEW}))
            }
        }))
    }

    return <>
        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={PATHS.MAPS_VIEW}>Maps</Link>,
                    },
                    {
                        title: map.name || 'Edit map'
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

export default EditMap