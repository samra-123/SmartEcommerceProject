import moment from 'moment';

export const getDatefromFireStoreTimeStamp=(fireStoreDateObject)=>{

    const date=new Date(fireStoreDateObject*1000);

    return moment(date).format('MMMM Do, hh:mm A')

}