import React from 'react'
import { useEffect,useState,useRef } from 'react'
function chat() {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')
    const socketRef = useRef(null)

    useEffect(() => {
        // Create WebSocket connection once when component mounts
        const socket = new WebSocket('ws://localhost:8080')
        
        socket.onopen = () => {
            console.log('Connected to server')
        }
        
        socket.onmessage = (event) => {
            console.log('Message from server:', event.data)
            setMessages(prev => [...prev, event.data])
        }
        
        socketRef.current = socket
        
        // Cleanup on unmount
        return () => {
            socket.close()
        }
    }, [])

    const sendbtn = () => {
        if (socketRef.current && socketRef.current.readyState === 1) {
            // Send message through existing WebSocket
            socketRef.current.send(text)
            // Clear the input
            setText('')
        }
    }

    return (

        <div>
            <div >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button onClick={sendbtn}>Send</button>
                <div>
                    {messages.map((msg,index)=>{
                        return (
                           < div key={index}>{msg}</div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default chat
