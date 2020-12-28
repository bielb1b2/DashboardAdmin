import React from 'react';


import {
    ToggleSelector,
    Container,
    ToggleLabel
}  from './styles';

interface IToggleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

const Toggle: React.FC<IToggleProps> = ({
    labelLeft, labelRight, checked, onChange
}) => (
    <Container>
        <ToggleLabel>{labelLeft}</ToggleLabel>
        <ToggleSelector 
            checked={checked}
            onChange={onChange}
        />
        <ToggleLabel>{labelRight}</ToggleLabel>
    </Container>
)

export default Toggle;
