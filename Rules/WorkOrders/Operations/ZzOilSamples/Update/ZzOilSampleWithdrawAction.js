import libCom from '../../../../Common/Library/CommonLibrary';
import ODataDate from '../../../../Common/Date/ODataDate';

export default function ZzOilSampleWithdrawAction(context) {
    let action = Promise.resolve();

    return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSampleWithdrawWarningDialog.action').then(successResult => {
        if (successResult.data) {
            context.binding.BatchWithdrawn = context.binding.Batch;
            context.binding.Batch = "";
            action = context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSampleWithdrawChangeSet.action');
        }
        return action;
    })
}