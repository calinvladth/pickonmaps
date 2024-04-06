import {Marker, Popup} from "react-leaflet";
import {onPickSelect, picksActions, PickState, selectPicks} from "../slices/picksSlice";
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {COLORS, ICON_SIZE} from "../utils/constants";
import {Link, useParams} from "react-router-dom";
import parse from "html-react-parser";
import {Popconfirm} from "antd";
import {useState} from "react";

function MarkersOnMap() {
    const dispatch = useDispatch()
    const {mapId} = useParams()
    const {picks, isDeleteLoading} = useSelector(selectPicks)
    const [open, setOpen] = useState(false)

    function handleMarkerClicked(pick: PickState) {
        dispatch(onPickSelect(pick))
    }

    function handleDelete(pick: PickState) {
        dispatch(picksActions.deletePick({pick, mapId, cb: () => setOpen(false)}))
    }

    return <>
        {
            picks.map(pick => <Marker eventHandlers={{
                click: () => {
                    handleMarkerClicked(pick)
                },
            }} key={pick.id} position={[pick.lat, pick.lng] as [lat: number, lng: number]}>
                {/*<Tooltip>{o.name}</Tooltip>*/}
                <Popup>
                    <>
                        {pick.name}
                        <Link to={`${mapId}/picks/${pick.id}`}><EditOutlined
                            style={{fontSize: ICON_SIZE.SM, color: COLORS.ORANGE}}/></Link>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            okButtonProps={{loading: isDeleteLoading}}
                            onConfirm={() => handleDelete(pick)}
                            onCancel={() => setOpen(false)}
                            okText="Yes"
                            cancelText="No"
                            open={open}
                        >
                            <DeleteOutlined style={{fontSize: ICON_SIZE.SM, color: COLORS.RED}}
                                            onClick={() => setOpen(true)}/>
                        </Popconfirm>
                    </>
                    <hr/>
                    {parse(pick.text || '')}
                </Popup>
            </Marker>)
        }
    </>
}

export default MarkersOnMap