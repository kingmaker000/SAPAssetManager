//Begin PG&E INSERT: Import Common Library
import libCom from '../Common/Library/CommonLibrary';
//End PG&E INSERT: Import Common Library

export default function PartsListViewCaption(context) {
    let filterOpts = [];
    if (context.binding.OrderId) {
        filterOpts.push(`OrderId eq '${context.binding.OrderId}'`);
    }
    if (context.binding.OperationNo) {
        filterOpts.push(`OperationNo eq '${context.binding.OperationNo}'`);
    }

    //Begin PG&E INSERT: Filter out oil sample bottle and syringe
    let takeSample = libCom.getAppParam(context, 'WORKORDER', 'ZzMovementReasonForOilSample');
    filterOpts.push(`MovementReason ne '${takeSample}'`);
    //End PG&E INSERT: Filter out oil sample bottle and syringe
    
    return context.count('/SAPAssetManager/Services/AssetManager.service','MyWorkOrderComponents', `$filter=${filterOpts.join(' and ')}`).then(count => {
        let params=[count];
        context.setCaption(context.localizeText('parts_x', params));
    }); 
}
