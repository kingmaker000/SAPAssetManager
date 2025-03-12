import libOilSample from '../ZzOilSampleLibrary';

export default function ZzOilSampleBatchReadLink(pageClientAPI) {
    
    if (!pageClientAPI) {
        throw new TypeError('Context can\'t be null or undefined');
    }

    return libOilSample.zzOilSampleUpdateSetODataValue(pageClientAPI, 'BatchReadLink');
}