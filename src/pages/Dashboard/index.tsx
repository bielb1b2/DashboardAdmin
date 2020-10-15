import React from 'react';
import ContentHeader from '../../components/ContentHeader';

import SelectInput from '../../components/SelectInput';

import { Container } from './styles';

const Dashboard: React.FC = () => {

    const options = [
        {value: 'Rodrigo', label: 'Rodrigo'},
        {value: 'Maria', label: 'Maria'},
        {value: 'Gabriel', label: 'Gabriel'},
    ]


    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#fff">
                <SelectInput options={options} />
            </ContentHeader> 
        </Container>
    );
}

export default Dashboard;