import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {mapsActions, MapState, selectMaps} from "../../slices/mapsSlice";
import {Link} from "react-router-dom";
import {Breadcrumb, Modal, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined, ShareAltOutlined} from "@ant-design/icons";
import {URL, COLORS, ICON_SIZE, PATHS} from "../../utils/constants";
import {onGeneralReset} from "../../slices/generalSlice";
import replaceKeysInUrl from "../../utils/replace-keys-in-url";
import {CopyBlock} from "react-code-blocks";
import generateIframe from "../../utils/generateIframe";

function MapsView() {
    const dispatch = useDispatch()
    const {maps, isLoading, isDeleteLoading} = useSelector(selectMaps)
    const [open, setOpen] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        dispatch(onGeneralReset())
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
            <Link to={PATHS.MAP_CREATE}>Create</Link>
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
        <Link to={PATHS.MAP_CREATE}>Create</Link>
        <ul>
            {maps.map(map => <li key={map.id}>
                <Link to={replaceKeysInUrl({keys: {mapId: map.id}, url: PATHS.PICKS_VIEW})}>{map.name}</Link>


                {/*<Link to={replaceKeysInUrl({keys: {mapId: map.id}, url: PATHS.MAP_SHARE})}><ShareAltOutlined /></Link>*/}
                <ShareAltOutlined onClick={() => setIsModalOpen(true)}/>

                <Link to={replaceKeysInUrl({keys: {mapId: map.id}, url: PATHS.MAP_EDIT})}><EditOutlined
                    style={{fontSize: ICON_SIZE.SM, color: COLORS.ORANGE}}/></Link>

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
                    <DeleteOutlined style={{fontSize: ICON_SIZE.SM, color: COLORS.RED}}
                                    onClick={() => setOpen(map.id as string)}/>
                </Popconfirm>
                <Modal title={`Share ${map.name}`} open={isModalOpen} onCancel={() => setIsModalOpen(false)}
                       footer={''}>
                    <CopyBlock codeBlock language="text" showLineNumbers={true}
                               text={generateIframe({
                                   url: `${URL}${replaceKeysInUrl({keys: {mapId: map.id}, url: PATHS.MAP_SHARE})}`,
                                   name: map.name
                               })}
                    />
                </Modal>
            </li>)}
        </ul>
    </>
}

export default MapsView