import libCom from '../../Common/Library/CommonLibrary';
import rejectNoteSave from '../Reject/RejectNoteSave';

export default function RejectSuccess(context) {

    let comment = libCom.getTargetPathValue(context, '#Control:LongTextNote/#Value');
    let rejectReason = context.evaluateTargetPath('#Control:ReasonLstPkr/#SelectedValue');

    libCom.setStateVariable(context, 'SupervisorRejectSuccess', true);
    libCom.setStateVariable(context, 'SupervisorRejectReason', rejectReason);
    if (comment) {
        return rejectNoteSave(context); //Save the reject comment
    }
    return context.executeAction('/SAPAssetManager/Actions/Page/ClosePage.action');  //No comment, so just close the reject page
}
