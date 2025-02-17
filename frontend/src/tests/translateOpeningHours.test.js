// import { translatedOpeningHours } from '../services/translatedOpeningHours';

const translatedOpeningHours = (openingHours) => {

    if (!openingHours) {
        return [];
    }

    const regex = /([A-Za-z]+):\s*([^,]+)/g;

    let daysAndHours = [];
    let match;

    while ((match = regex.exec(openingHours)) !== null) {
        const day = match[1];
        const hoursString = match[2].trim();
        const hours = hoursString.split(',').map(hour => hour.trim());

        daysAndHours.push({
            day: day,
            hours: hours
        });
    }

    daysAndHours.forEach(obj => {

        switch (obj.day) {
            case 'Monday': obj.day = 'Lundi'; break;
            case 'Tuesday': obj.day = 'Mardi'; break;
            case 'Wednesday': obj.day = 'Mercredi'; break;
            case 'Thursday': obj.day = 'Jeudi'; break;
            case 'Friday': obj.day = 'Vendredi'; break;
            case 'Saturday': obj.day = 'Samedi'; break;
            case 'Sunday': obj.day = 'Dimanche'; break;
            default: break;
        }

        obj.hours = obj.hours.map(hour => {
            if (hour === 'Closed') {
                return 'Fermé';
            } else if (hour === 'Open 24 hours') {
                return 'Ouvert 24h/24';
            } else {

                hour = hour.replace(/\u200B|\u200C|\u202F|\u00A0/g, ' ');
                const hours = hour.split(/\s*[\u2013\u2014]\s*/);
                
                if (hours.length === 2) {
                    const startHour = hours[0].trim();
                    const endHour = hours[1].trim();

                    const convertTo24HourFormat = (time) => {
                        const [hour, minuteAndPeriod] = time.split(':');
                        const [minute, period] = minuteAndPeriod.split(' ');
                        let hourInt = parseInt(hour);
                        if (period === 'PM' && hourInt !== 12) hourInt += 12;
                        if (period === 'AM' && hourInt === 12) hourInt = 0;
                        return `${hourInt}:${minute}`;
                    };

                    const start24h = convertTo24HourFormat(startHour);
                    const end24h = convertTo24HourFormat(endHour);

                    const formatHour = (time) => {
                        const [hour, minute] = time.split(':');
                        return minute === '00' ? `${parseInt(hour)}h` : `${parseInt(hour)}h${minute}`;
                    };

                    return `${formatHour(start24h)} - ${formatHour(end24h)}`;
                } else {
                    return 'Fermé';
                }
            }
        });

    });

    return daysAndHours;
};

describe('translatedOpeningHours doit traduire les heures d ouvertures en francais', () => {
    test('translatedOpeningHours doit retourner un tableau vide si la valeur passée en paramètre est vide', () => {
        expect(translatedOpeningHours('')).toEqual([]);
    });

    test('translatedOpeningHours doit retourner un tableau vide si la valeur passée en paramètre est null', () => {
        expect(translatedOpeningHours(null)).toEqual([]);
    });

    test('translatedOpeningHours doit retourner un tableau vide si la valeur passée en paramètre est undefined', () => {
        expect(translatedOpeningHours(undefined)).toEqual([]);
    });

    test('translatedOpeningHours doit retourner un tableau vide si la valeur passée en paramètre est un nombre', () => {
        expect(translatedOpeningHours(123)).toEqual([]);
    });

    test('translatedOpeningHours doit retourner un tableau vide si la valeur passée en paramètre est un objet', () => {
        expect(translatedOpeningHours({})).toEqual([]);
    });

    test('translatedOpeningHours doit retourner un tableau vide si la valeur passée en paramètre est un tableau', () => {
        expect(translatedOpeningHours([])).toEqual([]);
    });

    test('translatedOpeningHours doit retourner un tableau vide si la valeur passée en paramètre est un boolean', () => {
        expect(translatedOpeningHours(true)).toEqual([]);
    });

    test('translatedOpeningHours doit retourner un tableau vide si la valeur passée en paramètre est un string vide', () => {
        expect(translatedOpeningHours('')).toEqual([]);
    });

    test('translatedOpeningHours doit retourner un tableau d\objets avec 7 objets un pour chaque jour.', () => {
        expect(translatedOpeningHours('Monday: Closed, Tuesday: 7:00 PM – 2:00 AM, Wednesday: 7:00 PM – 2:00 AM, Thursday: 7:00 PM – 2:00 AM, Friday: 7:00 PM – 2:00 AM, Saturday: 7:00 PM – 2:00 AM, Sunday: Closed'))
        .toEqual([{day: 'Lundi', hours: 'Fermé'}, {day: 'Mardi', hours: '19h00 - 2h00'}, {day: 'Mercredi', hours: '19h00 - 2h00'}, {day: 'Jeudi', hours: '19h00 - 2h00'}, {day: 'Vendredi', hours: '19h00 - 2h00'}, {day: 'Samedi', hours: '19h00 - 2h00'}, {day: 'Dimanche', hours: 'Fermé'}]);
    });
});



