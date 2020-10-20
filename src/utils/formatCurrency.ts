const formatCurrency = (current: number): string => {
    return current.toLocaleString(
        'pt-bt',
        {
            style: 'currency', 
            currency: 'BRL'
        });
};

export default formatCurrency;