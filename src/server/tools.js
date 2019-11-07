import moment from 'moment';

const sortOutput = (a,b) => a > b ? 1 : b > a ? -1 : 0

export const sortArrayBy = (arr,criteria) => {
    return arr.sort((a,b)=>sortOutput(a.criteria,b.criteria))
}
export const sortArrayByDate = (arr) => {
    return arr.sort((a,b) => sortOutput(new Date(a.start_date),new Date(b.start_date)))
    };

export const compDatesToString = (start,end) => {
    const today = moment()
    if(today>=moment(start) && today<=moment(end)) {
        return 'Happening Now!'
    }
    else if(moment(start).isSame(new Date(),'month')) {
        return `In ${Math.floor(moment.duration(moment(start).diff(today)).asDays())} Days!`
    }   
    else {
        return `${moment(start).format('MMM Do')} - ${moment(end).format('Do')}`
    }
}