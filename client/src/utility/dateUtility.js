export function parseDate(dateStr){
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date (year, month -1, day)
}

export function getOrdersFromLast7Days(orders) {
   const sevenDaysAgo = new Date()
}