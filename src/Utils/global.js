const monthName = (monthNum) => {
    const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    return month[(parseInt(monthNum) - 1)];
}

const formatDate = (date) => {
    if (date != undefined) {
        let count = date.toString().trim().length;
        if (count < 10 || count > 10) {
            return null;
        }else {
            let dt = new Date(date)
            return `${String(dt.getDay()).padStart(2,0)}-${String(dt.getMonth()).padStart(2,0)}-${dt.getFullYear()}`
        }
    }else {
        return null;
    }
}

const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export {
    monthName,
    formatDate,
    formatNumber
}