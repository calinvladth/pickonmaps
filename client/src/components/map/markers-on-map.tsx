import {Marker, Popup} from "react-leaflet";
import {onPickSelect, picksActions, PickState, selectPicks} from "../../slices/picksSlice";
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {COLORS, ICON_SIZE} from "../../utils/constants";
import {Link, useParams} from "react-router-dom";
import parse from "html-react-parser";
import {Popconfirm} from "antd";
import {useState} from "react";
import L from "leaflet";
import MARKER_ICON from "../../assets/icons/marker.svg";
import {selectGeneral} from "../../slices/generalSlice";

const ICON = new L.Icon({
    iconUrl: MARKER_ICON,
    iconRetinaUrl: MARKER_ICON,
    iconSize: [35,45],
});

function MarkersOnMap() {
    const dispatch = useDispatch()
    const {mapId} = useParams()
    const {pick, picks, isDeleteLoading} = useSelector(selectPicks)
    const {isEditView} = useSelector(selectGeneral)
    const [open, setOpen] = useState(false)

    function handleMarkerClicked(pick: PickState) {
        dispatch(onPickSelect(pick))
    }

    function handleDelete(pick: PickState) {
        dispatch(picksActions.deletePick({pick, mapId, cb: () => setOpen(false)}))
    }

    // TODO: Don't display markers on edit mode
    // if (isEditView) {
    //     return null
    // }

    return <>
        {
            picks.map(obj => (pick.id === obj.id && isEditView) ? null  : <Marker eventHandlers={{
                click: () => {
                    handleMarkerClicked(obj)
                },
            }} key={obj.id} position={[obj.lat, obj.lng] as [lat: number, lng: number]} icon={ICON}>
                <Popup>
                    <>
                        {obj.name}
                        <Link to={`${mapId}/picks/${obj.id}`}><EditOutlined
                            style={{fontSize: ICON_SIZE.SM, color: COLORS.ORANGE}}/></Link>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            okButtonProps={{loading: isDeleteLoading}}
                            onConfirm={() => handleDelete(obj)}
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
                    {parse(obj.text || '')}
                </Popup>
            </Marker>)
        }
    </>
}

export default MarkersOnMap