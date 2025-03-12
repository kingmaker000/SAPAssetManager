import libPart from '../../PartLibrary';

export default function ZzPartIssueUpdateZzReasonVisible(context) {
    if (libPart.ZzPartMovementReasonIsSampleTaken(context)) {
        return true;
    } 
    return false;
}