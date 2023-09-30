function convertDate(dateString:string) {
    const [day, month, year] = dateString.split("/");
    
    const dateObject = new Date(`${year}-${month}-${day}`);
        return dateObject;
    }
export {convertDate};