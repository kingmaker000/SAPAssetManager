import libPart from '../../PartLibrary';

export default function ZzPartIssueUpdateZzEquipmentLstPkrVisible(context) {
    if (libPart.ZzPartMovementReasonIsSampleTaken(context)) {
        return true;
    } 
    return false;
}