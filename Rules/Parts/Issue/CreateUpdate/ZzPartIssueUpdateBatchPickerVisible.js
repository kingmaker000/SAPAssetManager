export default function ZzPartIssueUpdateBatchPickerVisible(context) {
    let binding = context.getPageProxy().binding;
    var plant = binding.Plant;
    var materialNum = binding.MaterialNum;

    if (binding['@odata.type'] === '#sap_mobile.MaterialDocument') {
        plant = binding.RelatedItem[0].Plant;
        materialNum = binding.RelatedItem[0].Material;
    }
   
    if (plant && materialNum) {
        let query = `$filter=Plant eq '${plant}' and MaterialNum eq '${materialNum}'`;
    
        return context.read('/SAPAssetManager/Services/AssetManager.service', 'MaterialPlants', [], query).then(result => {
            if (result && result.length === 1) {
                let material = result.getItem(0);
                let isBatch = material.BatchIndicator === 'X';
                return isBatch;
            }
            return false;
        });
    } 
    return false;
}