/**
* Describe this function...
* @param {context} clientAPI
* This rule returns the local notification created 
*/
export default function ZNotificationLocalNumber(context) {
    return context.binding.LocalNotificationID;
}