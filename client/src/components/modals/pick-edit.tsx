import {useEffect, useState} from "react";
import {Input, Modal, Space} from "antd";
import {onPickEdit, picksActions, selectPicks} from "../../slices/picksSlice";
import {useDispatch, useSelector} from "react-redux";
import TextEditor from "../editor/editor";
import {EVENT_CHANNELS} from "../../utils/constants";

function PickEdit() {
    const {isSaveLoading, pick} = useSelector(selectPicks)
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const channel = new BroadcastChannel(EVENT_CHANNELS.PICK_MODAL_EDIT)

    useEffect(() => {
        channel.addEventListener('message', event => {
            setIsOpen(event.data.isOpen)
        })
    }, [])

    function handleOk() {
        // TODO: Handle better
        dispatch(picksActions.savePick(pick))
        setIsOpen(false)
    }

    function handleCancel() {
        setIsOpen(false)
    }

    return <Modal title={pick.name} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        {isSaveLoading && 'Loading ...'}
        <Space direction="vertical" size="middle" style={{display: 'flex'}}>
            <Input placeholder="Category" value={pick.category}
                   onChange={e => dispatch(onPickEdit({category: e.target.value}))}/>
            <Input placeholder="Marker Name" value={pick.name}
                   onChange={e => dispatch(onPickEdit({name: e.target.value}))}/>


            <TextEditor text={pick.text} onChange={data => dispatch(onPickEdit({text: data}))}/>
        </Space>
    </Modal>
}

export default PickEdit