import {Link, useNavigate, useParams} from "react-router-dom";
import {Breadcrumb, Button, Input, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {onPickEdit, picksActions, selectPicks} from "../../slices/picksSlice";
import {useEffect} from "react";
import TextEditor from "../../components/editor/editor";
import {generalActions, onEdit, selectGeneral} from "../../slices/generalSlice";
import replaceKeysInUrl from "../../utils/replace-keys-in-url";
import {PATHS} from "../../utils/constants";

function Pick() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {mapId, pickId} = useParams()
    const {pick} = useSelector(selectPicks)
    const {markerPosition} = useSelector(selectGeneral)

    useEffect(() => {
        // dispatch(generalActions.getMap(mapId))
        dispatch(generalActions.getPick({mapId, pickId}))

        dispatch(onEdit(true))

        return () => {
            dispatch(onEdit(false))
        }
    }, [])

    function handleSubmit() {
        dispatch(picksActions.savePick({
            pick: {...pick, ...markerPosition}, mapId, cb: () => {
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
                        title: <Link to={replaceKeysInUrl({keys: {mapId}, url: PATHS.PICKS_VIEW})}>Picks</Link>
                    },
                    {
                        title: pick.name
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

export default Pick