import QueryBuilder from '../Common/Query/QueryBuilder';

//Begin PG&E INSERT: Import Common Library
import libCom from '../Common/Library/CommonLibrary';
//End PG&E INSERT: Import Common Library

export default function PartsCount(clientAPI) {
    let queryBuilder = new QueryBuilder();
    let binding = clientAPI.getPageProxy().binding;
    let orderId = binding.OrderId;
    let operationNo = binding.OperationNo;

    if (orderId) {
        queryBuilder.addFilter(`OrderId eq '${orderId}'`);
    }

    if (operationNo) {
        queryBuilder.addFilter(`OperationNo eq '${operationNo}'`);
    }

    //Begin PG&E INSERT: Filter out oil sample bottle and syringe
    let takeSample = libCom.getAppParam(clientAPI, 'WORKORDER', 'ZzMovementReasonForOilSample');
    queryBuilder.addFilter(`MovementReason ne '${takeSample}'`);
    //End PG&E INSERT: Filter out oil sample bottle and syringe


    return clientAPI.count('/SAPAssetManager/Services/AssetManager.service', 'MyWorkOrderComponents', queryBuilder.build());
}
