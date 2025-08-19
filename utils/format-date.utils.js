 export const formatTimeStampToDate = (date) => {
        const day = date.toLocaleDateString("us", {day: "numeric"});
        const month = date.toLocaleDateString("us", {month: "short"});
        const year = date.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;

        return formattedDate
    }