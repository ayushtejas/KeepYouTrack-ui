import { api, getToken } from "./base"

export const addTimer = async(title:string, duration:any) =>{
    const token = getToken()
    const res = await api.post('/events/timer/',
        {title, duration},
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data
}

export const getTimers = async() =>{
    const token = getToken()
    const res = await api.get('/events/timer/',
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data.results
}

export const addEvent = async(title:string,target_date:any) =>{
    const token = getToken()
    const res = await api.post('/events/event/',
        {title,target_date},
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data
}

export const getEvents = async() =>{
    const token = getToken()
    const res = await api.get('/events/event/',
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data.results
}