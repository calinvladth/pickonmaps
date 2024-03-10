import {Button, Popconfirm, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {mapActions, onEdit, selectMap} from "../slices/mapSlice";
import {useState} from "react";
import parse from 'html-react-parser';

function PickerView() {
    const dispatch = useDispatch()
    const {isDeleteLoading, isEdit, pick} = useSelector(selectMap)
    const [open, setOpen] = useState(false)

    function handleEdit() {
        dispatch(onEdit(!isEdit))
    }

    function handleDelete() {
        dispatch(mapActions.deletePick({pick, cb: () => setOpen(false)}))
    }

    return <>
        <Typography.Title level={1}>Picker view</Typography.Title>
        <p>
            {pick.category}
        </p>
        <p>
            {pick.name}
        </p>

            {parse(pick.text)}

        <Button type="primary" onClick={handleEdit}>Edit</Button>
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okButtonProps={{ loading: isDeleteLoading }}
            onConfirm={handleDelete}
            onCancel={() => setOpen(false)}
            okText="Yes"
            cancelText="No"
            open={open}
        >
            <Button danger onClick={() => setOpen(true)}>Delete</Button>
        </Popconfirm>

    </>
}

export default PickerView