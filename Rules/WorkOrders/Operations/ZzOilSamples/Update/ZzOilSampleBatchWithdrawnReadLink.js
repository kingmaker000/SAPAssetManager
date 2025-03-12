import libOilSample from '../ZzOilSampleLibrary';

export default function ZzOilSampleBatchWithdrawnReadLink(pageClientAPI) {
    
    if (!pageClientAPI) {
        throw new TypeError('Context can\'t be null or undefined');
    }

    return libOilSample.zzOilSampleUpdateSetODataValue(pageClientAPI, 'BatchWithdrawnReadLink');
}