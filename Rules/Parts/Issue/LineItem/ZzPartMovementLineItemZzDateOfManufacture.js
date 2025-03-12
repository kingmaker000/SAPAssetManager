import libPart from '../../PartLibrary';

export default function ZzPartMovementLineItemZzDateOfManufacture(pageClientAPI) {
    
    if (!pageClientAPI) {
        throw new TypeError('Context can\'t be null or undefined');
    }

    if (libPart.ZzPartMovementReasonIsSampleTaken(pageClientAPI)) {
        return libPart.partMovementLineItemCreateUpdateSetODataValue(pageClientAPI, 'ZzDateOfManufacture');
    }
    return '';
}