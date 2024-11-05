'use client'
import { useCallback, useRef } from "react"

const box = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'inset',
    width: '100%',
    height: '100vh'
}

function Modal( {setSwitchModal, switchModal, children} ) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    
    const onDismiss = useCallback(() => {
        setSwitchModal(false)
    },[switchModal])

    const onClick = useCallback((e) => {
        if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss()
        }
    })

    const onBtnClick = useCallback(() => {
        onDismiss()
    })

    return(
        <div ref={overlay} onClick={onClick} style={box}>
            <div ref={wrapper}>
            <button onClick={onBtnClick}>X</button>
                {children}
            </div>
        </div>
    )
}

export default Modal