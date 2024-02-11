export const formatTime = (value) => {
    if(!value){
        return ''
    }
    const date = new Date(value);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridiem = hours >= 12 ? 'pm' : 'am';

    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Ensure minutes are always displayed with two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}${meridiem}`;
}