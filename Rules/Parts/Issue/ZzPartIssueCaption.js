import libPart from '../PartLibrary';
export default function PartIssueNav(context) {

    if (libPart.ZzPartMovementReasonIsSampleTaken(context)) {
        return context.localizeText('take_sample');
    }
    return context.localizeText('issue_part');
}
