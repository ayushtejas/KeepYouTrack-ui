/* eslint-disable @typescript-eslint/no-explicit-any */

import { api, getToken } from'./base'

export const RegisterUser = async(email:string,password:string,name:string) =>{
    try{
    const res = await api.post('/user/create/',{
        email,
        password,
        name
    })
    return res.data}
    catch{
        return;
    }
}

export const LoginUser = async(email:string,password:string) =>{
    const res = await api.post('/user/login/',{
        email,
        password,
    })
    return res.data
}

export const getUser = async() =>{
    const token = getToken()
    const res = await api.get('/user/me/',
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data

}