import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles' 

type IIButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IIButtonProps> = ({children, ...rest}) => {
    return(
        <Container {...rest} >
            {children}
        </Container>
    )
}
export default Button