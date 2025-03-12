/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import ComLib from '../../Common/Library/CommonLibrary';

export default function ZNotificationCreateUpdateFieldsisVisible(clientAPI) {

    //Determine if we are on edit vs. create
    let onCreate = ComLib.IsOnCreate(clientAPI);
    if (onCreate) {
        return true;
    } else {
        return false;
    }
}