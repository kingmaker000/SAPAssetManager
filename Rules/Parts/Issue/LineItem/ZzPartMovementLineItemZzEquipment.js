import libPart from '../../PartLibrary';

export default function ZzPartMovementLineItemZzEquipment(pageClientAPI) {
    
    if (!pageClientAPI) {
        throw new TypeError('Context can\'t be null or undefined');
    }

    if (libPart.ZzPartMovementReasonIsSampleTaken(pageClientAPI)) {
        return libPart.partMovementLineItemCreateUpdateSetODataValue(pageClientAPI, 'ZzEquipment');
    }
    return '';
}