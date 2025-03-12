/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ZNotificationItemActivityTaskCodeValue(clientAPI) {
    return clientAPI.binding.ItemActivities[0].ActivityCode;
}