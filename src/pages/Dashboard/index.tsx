import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listOfMonths from '../../utils/months'

import grinningImg from '../../assets/grinning.svg';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';




import { Container, Content } from './styles';

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

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

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;


            if(month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount);
                }catch{
                    throw new Error('Invalid amount! Amount must be number')
                }
            }
        });
        return total;
    }, [monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;


            if(month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount);
                }catch{
                    throw new Error('Invalid amount! Amount must be number')
                }
            }
        });
        return total;
    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;

    }, [totalExpenses, totalGains])

    const message = useMemo(() => {
        if(totalBalance < 0){
            return {
                title: "Que triste!",
                description: "Neste mês, você gastou mais do que deveria",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias",
                icon: sadImg,
            }

        }
        else if(totalBalance === 0){
            return {
                title: "Ufaa!",
                description: "Neste mês, você gastou exatamente o que ganhou",
                footerText: 'Tenha cuidado. No próximo tente poupar o seu dinheiro',
                icon: grinningImg,
            }
        }else {
            return {
                title: "Muito Bem!!",
                description: "Sua carteira está positiva",
                footerText: 'Continue assim. Considere investir seu saldo',
                icon: happyImg,
            }
        }


    }, [totalBalance])

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;

        const data = [
            {
                name: "Entradas",
                value: totalExpenses,
                percent: Number(percentGains.toFixed(1)),
                color: '#f7931b'
            },
            {
                name: "Saídas",
                value: totalGains,
                percent: Number(percentExpenses.toFixed(1)),
                color: '#E44C4E'
            },
        ]
        
        return data;
    }, [totalExpenses, totalGains])

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {
            let amountEntry = 0;
            gains.forEach(expense => {
                const date = new Date(expense.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearSelected){
                    try {
                        amountEntry += Number(expense.amount);
                    }catch {
                        throw new Error('amountEntry is invalid. AmountEntry must be number');
                    }
                }
            })

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearSelected){
                    try {
                        amountOutput += Number(expense.amount);
                    }catch {
                        throw new Error('amountEntry is invalid. AmountEntry must be number');
                    }
                }
            })

            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput,
            }


        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        });
    }, [yearSelected]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('Invalid month value. Is accept 0 - 24.')

        }

    }

    const handleYearSelected = (month: string) => {
        try {
            const parseYear = Number(month);
            setYearSelected(parseYear);
        } catch  {
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
                    amount={totalBalance} 
                    footerlabel="atualizado com base nas entradas e saídas" 
                    icon="dolar"
                    color="#4e41f0" 
                />

                 <WalletBox 
                    title="entradas" 
                    amount={totalGains} 
                    footerlabel="atualizado com base nas entradas e saídas" 
                    icon="arrowUp"
                    color="#f7931b" 
                />

                 <WalletBox 
                    title="Saída" 
                    amount={totalExpenses} 
                    footerlabel="atualizado com base nas entradas e saídas" 
                    icon="arrowDown"
                    color="#e44c4e" 
                />

                <MessageBox 
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}

                />

                <PieChartBox data={relationExpensesVersusGains} />

                <HistoryBox 
                    data={historyData}
                    lineColorAmountEntry="#f7931b"
                    lineColorAmountOutput="#e44c4e"
                />

            </Content> 
        </Container>
    );
}

export default Dashboard;