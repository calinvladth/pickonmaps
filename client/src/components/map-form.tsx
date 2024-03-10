import {Button, Input, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {mapActions, onPickEdit, selectMap} from "../slices/mapSlice";

const { Title } = Typography;

function MapForm() {
    const {isSaveLoading, isEdit, pick} = useSelector(selectMap)
    const dispatch = useDispatch()
    function handleSave() {
        if (isEdit) {
            dispatch(mapActions.savePick(pick))
        }
    }

    return <>
        {
            pick.id ? <Title level={3}>Edit Pick</Title> : <Title level={3}>Add Picks</Title>
        }

        <Input placeholder="Category" value={pick.category} onChange={e => dispatch(onPickEdit({category: e.target.value}))}/>
        <Input placeholder="Marker Name" value={pick.name} onChange={e => dispatch(onPickEdit({name: e.target.value}))}/>

        <Title level={5}>Position: lat: {pick.position.lat} / lng: {pick.position.lng}</Title>
        <Button type="primary" onClick={handleSave} loading={isSaveLoading}>Save</Button>
    </>
}

export default MapForm