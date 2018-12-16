/**
 * convertDate() returns formatted dateStr
 * @param {String} dateStr - assumed to be the format of 'MM.DD.YYYY'
 */
export const convertDate = (dateStr) => {
    const dateArr = dateStr.split('.');
    let month = '';
    switch (dateArr[0]) {
        case '01': month = 'January'; break;
        case '02': month = 'February'; break;
        case '03': month = 'March'; break;
        case '04': month = 'April'; break;
        case '05': month = 'May'; break;
        case '06': month = 'June'; break;
        case '07': month = 'July'; break;
        case '08': month = 'August'; break;
        case '09': month = 'September'; break;
        case '10': month = 'October'; break;
        case '11': month = 'November'; break;
        case '12': month = 'December'; break;
        default: month = ''
    }
    return month + ' ' + dateArr[1] + ', ' + dateArr[2];
};

export const getDateStr = (date) => {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const dateStr = [yyyy, mm, dd].join('.');
    return dateStr;
}