import {PickState} from "../slices/mapSlice";

async function getPicks(): Promise<PickState[]> {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem('picks')) || [])
        }, 1000)
    })
}

async function createPick(pick: PickState) {
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log('PICK TO CREATE: ', pick)
            const existingPicks = JSON.parse(localStorage.getItem('picks')) || []
            existingPicks.push({id: Date.now(), ...pick})

            localStorage.setItem('picks', JSON.stringify(existingPicks))
            resolve(1)
        }, 1000)
    })
}

export async function editPick(pick: PickState) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            console.log('PICK TO EDIT: ', pick)
            const existingPicks: PickState[] = JSON.parse(localStorage.getItem('picks')) || []
            const updatedPicks = existingPicks.map(obj => {
                if (obj.id === pick.id) {
                    return pick
                }
                return obj
            })

            console.log('/?? L', updatedPicks)

            localStorage.setItem('picks', JSON.stringify(updatedPicks))

            resolve(1)
        }, 1000)
    })
}

async function deletePick(pick: PickState) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            const existingItems: PickState[] = JSON.parse(localStorage.getItem('picks')) || []
            localStorage.setItem('picks', JSON.stringify(existingItems.filter(item => item.name !== pick.name)))
            resolve(1)
        }, 1000)
    })
}

export const picksApi = {
    getPicks,
    createPick,
    editPick,
    deletePick
}