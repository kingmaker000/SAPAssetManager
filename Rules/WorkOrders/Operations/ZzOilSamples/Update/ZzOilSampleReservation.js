import libOilSample from '../ZzOilSampleLibrary';

export default function ZzOilSampleSampleReservation(pageClientAPI) {
    
    if (!pageClientAPI) {
        throw new TypeError('Context can\'t be null or undefined');
    }

    return libOilSample.zzOilSampleUpdateSetODataValue(pageClientAPI, 'Reservation');
}