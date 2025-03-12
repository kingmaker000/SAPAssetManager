/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ZNotificationActivityCodeListPicker(clientAPI) {
    var codes = [];
    return clientAPI.read('/SAPAssetManager/Services/AssetManager.service', 'ZFdaMatrices', [], '').then(function (results) {
        if (results && results.length > 0) {
            results.forEach(function (element) {
                codes.push(
                    {
                        'ReturnValue': element.TaskCode,
                        'DisplayValue': element.TaskCode + ' - ' + element.ActivityDesc
                    });
            });
            var sortedCodes = codes.sort((a, b) => a.ReturnValue.localeCompare(b.ReturnValue, undefined, { caseFirst: "upper" }));
            var uniqueCodes = [...new Map(sortedCodes.map((n) => [n.ReturnValue, n])).values()];
            return uniqueCodes;
        }
    }).catch((error) => {
        Logger.info('Error reading ZFdaMatrices' + error);
        return false;
    });
}