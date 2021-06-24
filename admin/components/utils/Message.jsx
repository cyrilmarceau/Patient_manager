import React from 'react'

import { message } from 'antd'

const Message = ({type, msg, timing}) => {
        let render = ''
        switch (type) {
            case 'success':
                render = (
                    message.success(msg, timing)
                )
                break;
            case 'error':
                render = (
                    message.error(msg, timing)
                )
                break;
            case 'info':
                render = (
                    message.info(msg, timing)
                )
                break;
            case 'warning':
                render = (
                    message.warning(msg, timing)
                )
                break;
        
            default:
                break;

            
        }
        return render
  
}

export default Message
