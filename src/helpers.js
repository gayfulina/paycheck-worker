// calculate time interval duration in minutes from start to end, 24h format
// start example '09:00'
// end example '18:00'
export function calculateDuration(start, end) {
    const startHours = parseInt(start.split(':')[0]);
    const startMinutes = parseInt(start.split(':')[1]);
    const endHours = parseInt(end.split(':')[0]);
    const endMinutes = parseInt(end.split(':')[1]);

    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = endHours * 60 + endMinutes;

    return totalEndMinutes - totalStartMinutes;
}

// calculate cost for minutes and rate per hour
export function calculateCost(min, rate) {
    return (min / 60) * rate;
}

// format hours and minutes from minutes
export function formatHoursAndMinutes(min) {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;

    // if zero minutes and not ero hours return only hours
    if (minutes === 0 && hours) return `${hours}h`;

    // if zero hours return only zero minutes
    if (hours === 0 && minutes) return `${minutes}m`;

    return `${hours}h ${minutes}m`;
}