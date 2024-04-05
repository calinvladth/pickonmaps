import {Button, Card, Popconfirm, Space, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {picksActions, onEdit, selectPicks} from "../slices/picksSlice";
import {useState} from "react";
import parse from 'html-react-parser';
import {AimOutlined, CheckOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {COLORS, EVENT_CHANNELS, ICON_SIZE} from "../utils/constants";

function PickerView() {
    const dispatch = useDispatch()
    const {isEdit, isDeleteLoading, pick} = useSelector(selectPicks)
    const [open, setOpen] = useState(false)
    const channel = new BroadcastChannel(EVENT_CHANNELS.PICK_MODAL_EDIT)

    function handleLocationChange() {
        dispatch(onEdit())
    }

    function handleLocationSave() {
        dispatch(picksActions.savePick(pick))
    }

    function handleEdit() {
        channel.postMessage({isOpen: true})
    }

    function handleDelete() {
        dispatch(picksActions.deletePick({pick, cb: () => setOpen(false)}))
    }

    return <Card title={`${pick.name}`} extra={
        <Space>
            {
                isEdit ? <CheckOutlined onClick={handleLocationSave}/> : <AimOutlined style={{fontSize: ICON_SIZE.SM, color: COLORS.BLUE}} onClick={handleLocationChange}/>
            }

            <EditOutlined style={{fontSize: ICON_SIZE.SM, color: COLORS.ORANGE}} onClick={handleEdit}/>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                okButtonProps={{loading: isDeleteLoading}}
                onConfirm={handleDelete}
                onCancel={() => setOpen(false)}
                okText="Yes"
                cancelText="No"
                open={open}
            >
                <DeleteOutlined style={{fontSize: ICON_SIZE.SM, color: COLORS.RED}} onClick={() => setOpen(true)}/>
            </Popconfirm>
        </Space>

    } style={{width: '100%'}}>
        {parse(pick.text || '')}

        <hr/>
        {pick.category}

    </Card>
}

export default PickerView