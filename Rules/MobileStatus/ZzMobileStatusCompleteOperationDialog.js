/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ZzMobileStatusCompleteOperationDialog(context) {
    return context.executeAction('/SAPAssetManager/Actions/MobileStatus/MobileStatusCompleteOperationDialog.action').then((diagResult) =>  {
        return diagResult.data;
    });
}