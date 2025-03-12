/*&========================================================================== *
*&       P A C I F I C  G A S  &  E L E C T R I C  C O M P A N Y             *
*&===========================================================================*
*& Author         : R6CM(Ravi Challa)                                        *
*& Date Started:  : 07/19/2023                                               *
*& Program Name  :  ZSupervisorSectionCountTasks                             *                                                     
 *& Description   :                                                           *
*& This file is used to provide count                                        *
*&===========================================================================*
*&---------------------------------------------------------------------------*
               P R O G R A M  C H A N G E  H I S T O R Y 
 *&---------------------------------------------------------------------------*/
/**
* Notification count to be displayed on the overview page for Supervisor Role.
* @param {*} context 
 */

export default function ZSupervisorNotificationCount(context) { 
    // read global query 
    var zqueryOption = "";
        zqueryOption = context.getGlobalDefinition('/SAPAssetManager/Globals/Notifications/ZNotificationTaskSupervisorQueryOption.global').getValue();
    // concatenate '$expand='to query. This is to use common odata query in multiple places 
    // Ex: ZNotificationsListViewQueryOption.js is using this query
    // concatenate '$expand=' to global query 
    var zGlobalqueryOption = '$expand=' + zqueryOption; 
    // read count for notifications for supervisor approval       
    return context.count('/SAPAssetManager/Services/AssetManager.service', 'MyNotificationHeaders', zGlobalqueryOption ).then(count => {
        return count;
    }); 
}
