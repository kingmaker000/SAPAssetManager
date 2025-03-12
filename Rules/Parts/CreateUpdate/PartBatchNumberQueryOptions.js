
export default function PartBatchNumberQueryOptions(context) {
    let materialNum = context.binding.MaterialNum || '';
    let plant = context.binding.Plant || '';

    if (context.binding.RelatedItem && context.binding.RelatedItem.length) {
        plant = context.binding.RelatedItem[0].Plant; 
        materialNum = context.binding.RelatedItem[0].Material; 
    }

//////////////////////////////////////////////////////////////////////////////////////////////
//Begin PG&E REPLACE: Sort batch list by batch number
//  return `$filter=Plant eq '${plant}' and MaterialNum eq '${materialNum}';
    return `$filter=Plant eq '${plant}' and MaterialNum eq '${materialNum}' &$orderby=Batch`;
//End PG&E REPLACE: Sort batch list by batch number
//////////////////////////////////////////////////////////////////////////////////////////////

}
