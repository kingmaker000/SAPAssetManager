export default function ZzOilSampleDiscardAction(context) {
    let action = Promise.resolve();

    return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSampleDiscardWarningDialog.action').then(successResult => {
        if (successResult.data) {
            let erroPageExists = false;
            try {
                if (context.getPageProxy().evaluateTargetPathForAPI('#Page:ErrorArchiveDetailsPage').getActionBinding().ErrorObject) {
                    erroPageExists = true;
                }
            } catch (error) {
                // do nothing
            }
            if (erroPageExists) {
                let readLink = context.getPageProxy().evaluateTargetPathForAPI('#Page:ErrorArchiveDetailsPage').getActionBinding().ErrorObject.ReadLink;
                return context.read('/SAPAssetManager/Services/AssetManager.service', readLink, [], '').then(result => {
                    context.getPageProxy().setActionBinding(result.getItem(0));
                    action = context.getPageProxy().executeAction('/SAPAssetManager/Actions/Common/ErrorArchiveDiscard.action');
                });
            } else {
                const entityName = context.binding['@odata.type'].split('.')[1];
                if (entityName === 'ZMyWorkOrderSample') {
                    if (context.binding.Batch && context.binding.BatchWithdrawn) {
                        action = context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSampleDiscardAllChangeSet.action');
                    } else if (context.binding.Batch) {
                        action = context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSampleDiscardCollectChangeSet.action');
                    } else if (context.binding.BatchWithdrawn) {
                        action = context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSampleDiscardWithdrawChangeSet.action');                       
                    }
                }
            }
        }
        return action;
    });
}