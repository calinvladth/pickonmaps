import {Breadcrumb, Button, Input, Space} from "antd";
import TextEditor from "../../components/editor/editor";
import {onPickEdit, picksActions, selectPicks} from "../../slices/picksSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {generalActions, onEdit, selectGeneral} from "../../slices/generalSlice";

function CreatePick() {
    const {mapId} = useParams()
    const dispatch = useDispatch()
    const {pick} = useSelector(selectPicks)
    const {markerPosition} = useSelector(selectGeneral)
    const navigate = useNavigate()

    useEffect(() => {
        if (!markerPosition.lat && !markerPosition.lng) {
            dispatch(generalActions.getMap(mapId))
        }

        dispatch(onEdit(true))

        return () => {
            dispatch(onEdit(false))
        }
    }, [])

    function handleSubmit() {
        dispatch(picksActions.savePick({
            pick: {...pick, ...markerPosition}, mapId, cb: () => {
                navigate(`/${mapId}/picks`)
            }
        }))
    }

    return <>
        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
            <Breadcrumb
                items={[
                    {
                        title: <Link to="/">Maps</Link>,
                    },
                    {
                        title: <Link to={`/${mapId}/picks`}>Picks</Link>
                    },
                    {
                        title: pick.name || 'Create pick'
                    }
                ]}
            />

            <Input placeholder="Category" value={pick.category}
                   onChange={e => dispatch(onPickEdit({category: e.target.value}))}/>
            <Input placeholder="Marker Name" value={pick.name}
                   onChange={e => dispatch(onPickEdit({name: e.target.value}))}/>

            <TextEditor text={pick.text} onChange={data => dispatch(onPickEdit({text: data}))}/>
            <Button onClick={handleSubmit}>Submit</Button>
        </Space>
    </>
}

export default CreatePick