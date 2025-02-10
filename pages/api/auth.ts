import { api, getToken } from'./base'

export const RegisterUser = async(email:String,password:String,name:String) =>{
    const res = await api.post('/user/create/',{
        email,
        password,
        name
    })
    return res.data
}

export const LoginUser = async(email:String,password:String) =>{
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