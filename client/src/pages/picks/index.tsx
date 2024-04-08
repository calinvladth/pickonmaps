import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {onPickReset, picksActions, PickState, selectPicks} from "../../slices/picksSlice";
import {Breadcrumb} from "antd";
import {EVENT_CHANNELS, PATHS} from "../../utils/constants";
import {generalActions, selectGeneral} from "../../slices/generalSlice";
import replaceKeysInUrl from "../../utils/replace-keys-in-url";

function Picks() {
    const {mapId} = useParams()
    const {picks, isLoading} = useSelector(selectPicks)
    const {markerPosition} = useSelector(selectGeneral)
    const dispatch = useDispatch()
    const channel = new BroadcastChannel(EVENT_CHANNELS.MOVE_TO_PICK)

    useEffect(() => {
        if (!markerPosition.lat && !markerPosition.lng) {
            dispatch(generalActions.getMap(mapId))
        }
        dispatch(picksActions.getPicks(mapId))
        return () => {
            dispatch(onPickReset())
        }
    }, [dispatch, mapId])

    function handleClick(pick: PickState) {
        channel.postMessage({lat: pick.lat, lng: pick.lng})
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
            {picks.map(pick => <li key={pick.id} onClick={() => handleClick(pick)}>{pick.name}</li>)}
        </ul>
    </>
}

export default Picks