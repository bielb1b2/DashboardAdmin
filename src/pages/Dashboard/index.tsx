import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months'

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';


import { Container, Content } from './styles';

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const options = [
        {value: 'Rodrigo', label: 'Rodrigo'},
        {value: 'Maria', label: 'Maria'},
        {value: 'Gabriel', label: 'Gabriel'},
    ]

    const years = useMemo(() => {

        let uniqueYears: number[] = []; 

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });

    }, [])

    const month = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
        }
        });
    }, []);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('Invalid month value. Is accept 0 - 24.')

        }

    }

    const handleYearSelected = (month: string) => {
        try {
            const parseYear = Number(month);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Invalid year value. Is accept integer number')

        }

    }


    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput options={month} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Content>
                <WalletBox 
                    title="saldo" 
                    amount={150.00} 
                    footerlabel="atualizado com base nas entradas e saídas" 
                    icon="dolar"
                    color="#4e41f0" 
                />
                 <WalletBox 
                    title="entradas" 
                    amount={5000.00} 
                    footerlabel="atualizado com base nas entradas e saídas" 
                    icon="arrowUp"
                    color="#f7931b" 
                />
                 <WalletBox 
                    title="Saída" 
                    amount={4850.00} 
                    footerlabel="atualizado com base nas entradas e saídas" 
                    icon="arrowDown"
                    color="#e44c4e" 
                />

                <MessageBox 
                    title="Muito Bem!"
                    description="Sua carteira está positiva!"
                    footerText="Continue assim. Considere investir o seu saldo."
                    icon={happyImg}

                />
            </Content> 
        </Container>
    );
}

export default Dashboard;