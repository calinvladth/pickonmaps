import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {mapsActions, MapState, selectMaps} from "../../slices/mapsSlice";
import {Link} from "react-router-dom";
import {Breadcrumb, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {COLORS, ICON_SIZE} from "../../utils/constants";

function Maps() {
    const dispatch = useDispatch()
    const {maps, isLoading, isDeleteLoading} = useSelector(selectMaps)
    const [open, setOpen] = useState('')

    useEffect(() => {
        dispatch(mapsActions.getMaps())
    }, [])

    function handleDelete(map: MapState) {
        dispatch(mapsActions.deleteMap({map, cb: () => setOpen(false)}))
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }

    if (maps.length === 0) {
        return <>
            <p>No maps</p>
            <Link to="/create">Create</Link>
        </>
    }

    return <>
        <Breadcrumb
            items={[
                {
                    title: 'Maps',
                }
            ]}
        />
        <hr/>
        <Link to="/create">Create</Link>
        <ul>
            {maps.map(map => <li key={map.id}>
                <Link to={`/${map.id}/picks`}>{map.name}</Link>
                <Link to={`/${map.id}`}><EditOutlined style={{fontSize: ICON_SIZE.SM, color: COLORS.ORANGE}}/></Link>

                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    okButtonProps={{loading: isDeleteLoading}}
                    onConfirm={() => handleDelete(map)}
                    onCancel={() => setOpen('')}
                    okText="Yes"
                    cancelText="No"
                    open={open === map.id}
                >
                    <DeleteOutlined style={{fontSize: ICON_SIZE.SM, color: COLORS.RED}} onClick={() => setOpen(map.id as string)}/>
                </Popconfirm>
            </li>)}
        </ul>
    </>
}

export default Maps