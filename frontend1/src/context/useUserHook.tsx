import { ReactElement, createContext, useReducer } from "react"
import { User } from "../types/types"
import { useNavigate } from "react-router-dom"
import { users } from "../data"

type StateType = {
    user: User | null
}
export const initialState: StateType = {
    user: null
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
            return {...state, user: action.payload as User}
            case REDUCER_ACTION_TYPE.register:
                return {...state, user: action.payload as User}
                case REDUCER_ACTION_TYPE.logOut:
                    return {...state, user: null}
        default:
            return state;
    }
}

const useUserContext = (initState: StateType)=>{
    const [state, dispatch]= useReducer(reducer, initState)
    const navigate = useNavigate()

    const registerHandler = (regNo: string, password: string, email: string)=>{
        dispatch({
            type: REDUCER_ACTION_TYPE.register,
            payload: {
                email: email,
                registrationNumber: regNo,
                name: "from backend",
                validToken: 'siu'
            }
        })
        navigate('/home')
    }
    const signInHandler = (regNo: string, password: string)=>{
        if (regNo && password) {
            const user = users.find(x=> {
                return x.registrationNumber == regNo
            })
            if (user) {
                dispatch({
                    type: REDUCER_ACTION_TYPE.logIn,
                    payload: {
                        email: user.name,
                        registrationNumber: user.registrationNumber,
                        name: user.name,
                        validToken: user.validToken
                    }
                })
                navigate('/home')
                return;       
            }
            alert('user does not exist')
        }
        alert("invalid credentials")
    }
    const logOutHandler = ()=>{
        dispatch({
            type: REDUCER_ACTION_TYPE.logOut,
        })
    }

    return { state, registerHandler, signInHandler, logOutHandler}
}

type useUserContextType = ReturnType<typeof useUserContext>

const initialContextState : useUserContextType = {
    state: initialState,
    logOutHandler: ()=>{},
    signInHandler:  (regNo: string, password: string) =>{},
    registerHandler: (regNo: string, password: string, email: string) =>{}
}

export const UserContext = createContext<useUserContextType>(initialContextState)

type ChildrenType ={
    children?: ReactElement | undefined
}
export const UserProvider = ({children, ...initialState}: ChildrenType & StateType): ReactElement=>{
    return <UserContext.Provider value={useUserContext(initialState)}>{children}</UserContext.Provider>
}