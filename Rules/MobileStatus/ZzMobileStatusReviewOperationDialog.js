/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ZzMobileStatusReviewOperationDialog(context) {
    return context.executeAction('/SAPAssetManager/Actions/MobileStatus/ZzMobileStatusReviewOperationDialog.action').then((diagResult) =>  {
        return diagResult.data;
    });
}