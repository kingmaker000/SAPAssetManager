//Begin PG&E INSERT: Import Common Library
import libCom from '../Common/Library/CommonLibrary';
//End PG&E INSERT: Import Common Library

export default function PartsListQueryOptions(context) {

    let searchString = context.searchString;
    let queryBuilder = context.dataQueryBuilder();

    let filterOpts = [];
    let searchFilterOpts = [];

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

    queryBuilder.filter(filterOpts.join(' and '));

    if (searchString !== '') {
        searchFilterOpts.push(`substringof('${searchString}', MaterialNum) eq true`);
        searchFilterOpts.push(`substringof('${searchString.toLowerCase()}', tolower(TextTypeDesc)) eq true`);
        searchFilterOpts.push(`substringof('${searchString.toLowerCase()}', tolower(ComponentDesc)) eq true`);
        let searchTerms = queryBuilder.filterTerm().or(`(${searchFilterOpts.join(' or ')})`, queryBuilder.mdkSearch(searchString));
        queryBuilder.filter().and(searchTerms);
    }

    queryBuilder.orderBy('OperationNo','ItemNumber');
    queryBuilder.expand('Material');
    queryBuilder.expand('MaterialBatch_Nav');
    return queryBuilder;
}
