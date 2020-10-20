import React, {useMemo, useState, useEffect} from 'react';
import { v4 } from 'uuid';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filters } from './styles';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency:  string;
    dateFormatted: string;
    tagColor: string; 
}

const List: React.FC<IRouteParams> = ({ match }) => {

    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frquencyFilterSelected, setFrquencyFilterSelected] = useState(['recorrente', 'eventual']);

    const movimentType = match.params.type;

    const pageData = useMemo(() => {
        return movimentType ==='entry-balance' ? {
            title: 'Entradas',
            lineColor: '#4e41f0',
            data: gains,
        } : {
            title: 'Saídas',
            lineColor: '#e44c4e',
            data: expenses,
        }
    }, [movimentType])


    const years = useMemo(() => {
        const { data } = pageData; 

        let uniqueYears: number[] = []; 

        data.forEach(item => {
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

    }, [pageData])

    const month = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
        }
        });
    }, []);

    const handleFrequencyClick = ( frequency: string) => {
        const alreadySelected = frquencyFilterSelected.findIndex(item => item === frequency);

        if(alreadySelected >= 0){
            const filtered = frquencyFilterSelected.filter(item => item !== frequency);
            setFrquencyFilterSelected(filtered);

        } else {
            setFrquencyFilterSelected((prev) => [...prev, frequency]);
        }

    }

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

    useEffect(() => {
        const { data } = pageData;

        const filteredData = data.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frquencyFilterSelected.includes(item.frequency);
        });

        const formattedData = filteredData.map(item => {


            return {
                id: v4(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e'
            }
        })

        setData(formattedData);

    }, [frquencyFilterSelected, monthSelected, yearSelected, pageData])


    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={month} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent ${frquencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                > Recorrentes
                
                </button>
                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual ${frquencyFilterSelected.includes('eventual') && 'tag-actived'}` }
                    onClick={() => handleFrequencyClick('eventual')}
                > Eventuais
                
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id} 
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}

                        />
                    ))
                }

            </Content> 
        </Container>
    );
}

export default List;