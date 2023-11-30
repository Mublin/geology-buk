import { ReactElement, createContext, useReducer } from "react"
import { User } from "../types/types"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

type StateType = {
    userDetails: User | null
}
export const initialState: StateType = {
    userDetails: localStorage.getItem("userDetail") ? JSON.parse(localStorage.getItem('userDetail') as string) : null
}
const enum REDUCER_ACTION_TYPE {
    logIn,
    register,
    logOut
}
type ReducerAction ={
    type: REDUCER_ACTION_TYPE,
    payload?: User | null
}
const reducer = (state: StateType, action: ReducerAction): StateType =>{
    switch (action.type) {
        case REDUCER_ACTION_TYPE.logIn:
            return {...state, userDetails: action.payload as User}
            case REDUCER_ACTION_TYPE.register:
                return {...state, userDetails: action.payload as User}
                case REDUCER_ACTION_TYPE.logOut:
                    return {...state, userDetails: null}
        default:
            return state;
    }
}

const useUserContext = (initState: StateType)=>{
    const [state, dispatch]= useReducer(reducer, initState)
    const navigate = useNavigate()

    const registerHandler = async (regNo: string, password: string, email: string)=>{
        try {
            console.log({regNo, password})
            const {data}:{data : User} = await axios.post(`http://localhost:9000/api/users/register`, {
                regNo,
                email,
                password
            })
            if (data) {
                dispatch({
                    type: REDUCER_ACTION_TYPE.register,
                    payload: {
                        email: data.email,
                        regNo: data.regNo,
                        name: data.name,
                        tokened: data.tokened,
                        id: data.id,
                        isAdmin: data.isAdmin,
                        isStudent: data.isStudent
                    }
                })
                localStorage.setItem('userDetail', JSON.stringify({
                    email: data.email,
                    regNo: data.regNo,
                    name: data.name,
                    tokened: data.tokened,
                    id: data.id,
                    isAdmin: data.isAdmin,
                    isStudent: data.isStudent
                }))
                navigate('/home')
                toast.success(`Welcome ${data.name}!, enjoy your day`)
            }else{
                throw Error("Invalid username or password")
            }
        } catch (error) {
            alert(error)
        }
    }
    const signInHandler = async (regNo: string, password: string)=>{
    try {
        const {data} : {data : User} = await axios.post(`http://localhost:9000/api/users/signin`, {
            regNo,
            password
        })
        if (data) {
            dispatch({
                type: REDUCER_ACTION_TYPE.logIn,
                payload: {
                        email: data.email,
                        regNo: data.regNo,
                        name: data.name,
                        tokened: data.tokened,
                        id: data.id,
                        isAdmin: data.isAdmin,
                        isStudent: data.isStudent
                }
            })
            localStorage.setItem('userDetail', JSON.stringify({
                email: data.email,
                regNo: data.regNo,
                name: data.name,
                tokened: data.tokened,
                id: data.id,
                isAdmin: data.isAdmin,
                isStudent: data.isStudent
            }))
            navigate('/home')
            toast.success(`welcome back ${data.name}!`)
        }else{
            throw Error("Invalid username or password")
        }
    } catch (error) {
        alert(error)
    }
    }
    const logOutHandler = ()=>{
        dispatch({
            type: REDUCER_ACTION_TYPE.logOut,
        })
        localStorage.removeItem('userDetail')
    }

    return { state, registerHandler, signInHandler, logOutHandler}
}

type useUserContextType = ReturnType<typeof useUserContext>

const initialContextState : useUserContextType = {
    state: initialState,
    logOutHandler: ()=>{},
    signInHandler:  async (regNo: string, password: string) =>{},
    registerHandler: async (regNo: string, password: string, email: string) =>{}
}

export const UserContext = createContext<useUserContextType>(initialContextState)

type ChildrenType ={
    children?: ReactElement | undefined
}
export const UserProvider = ({children, ...initialState}: ChildrenType & StateType): ReactElement=>{
    return <UserContext.Provider value={useUserContext(initialState)}>{children}</UserContext.Provider>
}