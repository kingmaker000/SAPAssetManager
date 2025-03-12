import libOilSample from '../ZzOilSampleLibrary';

export default function ZzOilSampleSampleMaterialDocumentItem(pageClientAPI) {
    
    if (!pageClientAPI) {
        throw new TypeError('Context can\'t be null or undefined');
    }

    return libOilSample.zzOilSampleUpdateSetODataValue(pageClientAPI, 'MaterialDocumentItem');
}