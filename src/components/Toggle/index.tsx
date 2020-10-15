import React from 'react';


import {
    ToggleSelector,
    Container,
    ToggleLabel
}  from './styles';

const Toggle: React.FC = () => (
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelector 
            checked
            onChange={() => console.log('mudou')}
        />
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
)

export default Toggle;