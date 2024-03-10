import {Button} from "antd";
import {CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux'
import {onCloseAddEdit, onEdit, onPickEdit, selectMap} from "../slices/mapSlice";
import {Marker} from "react-leaflet";
import {useMemo, useRef} from "react";

function EditMap() {
    const dispatch = useDispatch()
    const {isPickView, isAdd, isEdit, pick} = useSelector(selectMap)
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    dispatch(onPickEdit({position: marker.getLatLng()}))
                }
            },
        }),
        [],
    )

    const icon = isEdit || isPickView ? <CloseOutlined/> : <PlusOutlined/>

    function handleButtonAction() {
        if (isEdit || isPickView) {
            dispatch(onCloseAddEdit())
        } else {
            dispatch(onEdit())
        }
    }

    return <>
        {
            isAdd || isEdit && <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={pick.position}
                ref={markerRef}>
            </Marker>
        }

        <Button type="primary" shape="circle" size="large" icon={icon}
                style={{position: "absolute", bottom: '5%', right: '5%', zIndex: 1000}}
                onClick={handleButtonAction}
        />
    </>
}

export default EditMap