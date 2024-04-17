import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {onPickReset, onPickSelect, picksActions, PickState, selectPicks} from "../../slices/picksSlice";
import {Breadcrumb, Popconfirm} from "antd";
import {COLORS, ICON_SIZE, PATHS} from "../../utils/constants";
import {generalActions, onPositionChange} from "../../slices/generalSlice";
import replaceKeysInUrl from "../../utils/replace-keys-in-url";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {selectMaps} from "../../slices/mapsSlice";

function PicksView() {
    const dispatch = useDispatch()
    const {mapId} = useParams()
    const {map} = useSelector(selectMaps)
    const {picks, isLoading, isDeleteLoading} = useSelector(selectPicks)
    const [open, setOpen] = useState('')

    useEffect(() => {
        if (mapId !== map?.id) {
            dispatch(generalActions.getMap(mapId))
        }

        return () => {
            dispatch(onPickReset())
        }
    }, [dispatch, mapId, map?.id])

    function handleClick(pick: PickState) {
        dispatch(onPickSelect(pick))
        dispatch(onPositionChange({lat: pick.lat, lng: pick.lng}))
    }

    function handleDelete(pick: PickState) {
        dispatch(picksActions.deletePick({pick, mapId, cb: () => setOpen(false)}))
    }

    if (isLoading) {
        return <p>Loading ...</p>
    }

    if (picks.length === 0) {
        return <>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={PATHS.MAPS_VIEW}>Maps</Link>,
                    },
                    {
                        title: 'Picks'
                    }
                ]}
            />
            <p>No picks</p>
            <Link to={replaceKeysInUrl({keys: {mapId}, url: PATHS.PICKS_CREATE})}>Create pick</Link>
        </>
    }

    return <>
        <Breadcrumb
            items={[
                {
                    title: <Link to={PATHS.MAPS_VIEW}>Maps</Link>,
                },
                {
                    title: 'Picks',
                }
            ]}
        />
        <Link to={replaceKeysInUrl({keys: {mapId}, url: PATHS.PICKS_CREATE})}>Create pick</Link>
        <ul>
            {picks.map(pick => <li key={pick.id} onClick={() => handleClick(pick)}>
                {pick.name}
                <Link to={replaceKeysInUrl({keys: {mapId, pickId: pick.id}, url: PATHS.PICK_VIEW})}><EditOutlined
                    style={{fontSize: ICON_SIZE.SM, color: COLORS.ORANGE}}/></Link>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    okButtonProps={{loading: isDeleteLoading}}
                    onConfirm={() => handleDelete(pick)}
                    onCancel={() => setOpen('')}
                    okText="Yes"
                    cancelText="No"
                    open={open === pick.id}
                >
                    <DeleteOutlined style={{fontSize: ICON_SIZE.SM, color: COLORS.RED}}
                                    onClick={() => setOpen(pick.id as string)}/>
                </Popconfirm>
            </li>)}
        </ul>
    </>
}

export default PicksView