import {useEffect, useState} from "react";

function usePositionChange() {
    const [position, setPosition] = useState<[lat: number, lng: number]>([])
    const channel = new BroadcastChannel('mapPosition')



    useEffect(() => {
        channel.addEventListener("message", event => {
            setPosition(event.data)
        })
    }, [])

    return position

}

export default usePositionChange