export default function ZzOilSamplesListViewQueryOptions(context) {

    let binding = context.binding;
    let searchString = context.searchString;
    let queryBuilder = context.dataQueryBuilder();

    queryBuilder.expand('Material');
    queryBuilder.expand('Equipment');

    let primaryFilters = [
        `OrderId eq '${binding.OrderId}'`,
        `OperationNo eq '${binding.OperationNo}'`
    ];
    queryBuilder.filter(primaryFilters.join(' and '));

    if (searchString !== '') {
        let searchFilters = [
            `substringof('${searchString}', EquipId) eq true`,
            `substringof('${searchString}', Batch) eq true`,
            `substringof('${searchString.toLowerCase()}', tolower(Material/Description))`,
            `substringof('${searchString.toLowerCase()}', tolower(Equipment/InventoryNum))`,
            `substringof('${searchString.toLowerCase()}', tolower(Equipment/ZzOperatingNum))`,        
            `substringof('${searchString.toLowerCase()}', tolower(Equipment/EquipDesc))`,
            `substringof('${searchString.toLowerCase()}', tolower(Equipment/EquipType))`
        ];
        let searchTerm = queryBuilder.filterTerm(`(${searchFilters.join(' or ')})`);
        queryBuilder.filter().and(searchTerm);
    }

    queryBuilder.orderBy('ChamberNum','MaterialNum');

    return queryBuilder;
}