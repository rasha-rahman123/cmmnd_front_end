export const countTotalLineItems = (lineItems) => { 
    return lineItems.reduce((accumulator, item) => accumulator + (item.quantity || 0), 0);
}