import QueryBuilder from '../../../Common/Query/QueryBuilder';

export default function ZzOilSamplesCount(context, countType) {
    let binding = context.binding;
    let queryBuilder = new QueryBuilder();

    var workOrder;
    var operation;

    if (binding.OrderId) {
        workOrder = binding.OrderId;
        operation = binding.OperationNo;
    }
    else {
        workOrder = binding.getItem([0]).OrderId;
        operation = binding.getItem([0]).OperationNo;
    }

    if (workOrder && operation) {

        queryBuilder.addFilter(`OrderId eq '${workOrder}'`);
        queryBuilder.addFilter(`OperationNo eq '${operation}'`);

        if (countType === 'COMPLETE') {
            queryBuilder.addFilter(`Batch ne ''`);
        }

        return context.count('/SAPAssetManager/Services/AssetManager.service', 'ZMyWorkOrderSamples', queryBuilder.build());
    }
}