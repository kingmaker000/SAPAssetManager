/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ZNotificationDamageCodeListPicker(clientAPI) {
    var codes = [];
    return clientAPI.read('/SAPAssetManager/Services/AssetManager.service', 'ZFdaMatrices', [], '').then(function (results) {
        if (results && results.length > 0) {
            results.forEach(function (element) {
                codes.push(
                    {
                        'ReturnValue': element.DamageCode,
                        'DisplayValue': element.DamageCode + ' - ' + element.DamageDesc
                    });
            });
            const uniqueCodes = [...new Map(codes.map((n) => [n.ReturnValue, n])).values()];
            return uniqueCodes;
        }
    }).catch((error) => {
        Logger.info('Error reading ZFdaMatrices' + error);
        return false;
    });
}