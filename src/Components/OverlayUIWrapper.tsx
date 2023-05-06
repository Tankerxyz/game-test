import {useProgress} from '@react-three/drei'
import React from 'react'
import UserNameForm from './UserNameForm'
import PopoutMenu from './PopoutMenu'

interface UserNameFormProps {
    socket: WebSocket
}

const OverlayUIWrapper: React.FC<UserNameFormProps> = ({socket}) => {
    return (
        <>
            <UserNameForm socket={socket}/>
            <PopoutMenu socket={socket}/>
        </>
    )
}

export default OverlayUIWrapper
