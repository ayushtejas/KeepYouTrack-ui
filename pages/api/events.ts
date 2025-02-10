import { api, getToken } from "./base"

export const addTimer = async(title:string,duration:any) =>{
    const token = getToken()
    try{
    const res = await api.post('/events/timer/',
        {title,duration},
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data}
    catch{
        return;
    }
}

export const putTimer = async(title:string,duration:any, id:any) =>{
    const token = getToken()
    try{
    const res = await api.put(`/events/timer/${id}/`,
        {title,duration},
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data}
    catch{
        return;
    }
}

export const deleteTimer = async(id:any) =>{
    const token = getToken()
    try{
    const res = await api.delete(`/events/timer/${id}/`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data}
    catch{
        return;
    }
}

export const getTimers = async() =>{
    const token = getToken()
    try{
    const res = await api.get('/events/timer/',
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data.results}
    catch{
        return
    }
}

export const addEvent = async(title:string,target_date:any) =>{
    const token = getToken()
    try{
    const res = await api.post('/events/event/',
        {title,target_date},
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data}
    catch{
        return;
    }
}

export const getEvents = async() =>{
    const token = getToken()
    try{
    const res = await api.get('/events/event/',
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data.results}
    catch{
        return;
    }
}

export const deleteEvent = async(id:any) =>{
    const token = getToken()
    try{
    const res = await api.delete(`/events/event/${id}/`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data}
    catch{
        return;
    }
}