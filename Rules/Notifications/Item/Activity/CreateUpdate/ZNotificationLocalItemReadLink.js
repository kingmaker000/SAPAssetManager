/**
* Describe this function...
* @param {IClientAPI} clientAPI
* This rules returns the item readlink 
*/
export default function ZNotificationLocalItemReadLink(clientAPI) {

    var NotificationQueryOpts = `$filter=NotificationNumber eq '${clientAPI.binding.LocalNotificationID}'`;
    return clientAPI.read('/SAPAssetManager/Services/AssetManager.service', 'MyNotificationItems', [], NotificationQueryOpts).then( function(data) {
        if (data.length > 0) {
            return data.getItem(0)['@odata.readLink'];
        }
    });    
}