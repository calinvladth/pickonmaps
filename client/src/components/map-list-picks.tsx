import {Flex, Typography} from "antd";
import {useSelector} from "react-redux";
import {selectMap} from "../slices/mapSlice";

const {Title, Text} = Typography

function MapListPicks() {
    const {picks} = useSelector(selectMap)
    const channel = new BroadcastChannel('mapListPickClicked')


    function handlePickClick(position: [lat: number, lng: number]) {
        channel.postMessage(position)
    }

    if (!picks) {
        return <Text>Loading...</Text>
    }

    return <Flex vertical style={{marginTop: '50px'}}>
        <Title level={1}>Picks</Title>
        {picks.map(pick => <Text style={{cursor: "pointer"}} key={pick.name} onClick={() => handlePickClick([pick.position.lat, pick.position.lng])}>{pick.name}</Text>)}
    </Flex>
}

export default MapListPicks