import {Button, Flex, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {onPickSelect, selectPicks} from "../slices/picksSlice";
import {useEffect} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {EVENT_CHANNELS} from "../utils/constants";

const {Title, Text} = Typography

function MapListPicks() {
    const dispatch = useDispatch()
    const {picks} = useSelector(selectPicks)
    const channel = new BroadcastChannel(EVENT_CHANNELS.MOVE_TO_PICK)

    const createPickChannel = new BroadcastChannel(EVENT_CHANNELS.PICK_MODAL_CREATE)


    function handlePickClick(pick: { lat: number, lng: number }) {
        const {lat, lng} = pick
        // dispatch(onPickSelect(pick))
        channel.postMessage({lat, lng})
    }

    function handleAddPick() {
        createPickChannel.postMessage({isOpen: true})
    }

    if (!picks) {
        return <Text>Loading...</Text>
    }

    return <Flex vertical style={{marginTop: '50px'}}>
        <Title level={1}>Picks</Title>
        <Button type="primary" shape="circle" size="large" icon={<PlusOutlined/>}
                style={{position: "absolute", bottom: '5%', right: '5%', zIndex: 1000}}
                onClick={handleAddPick}
        />

        {picks.map(pick => <Text style={{cursor: "pointer"}} key={pick.name}
                                 onClick={() => handlePickClick(pick)}>{pick.name}</Text>)}
    </Flex>
}

export default MapListPicks