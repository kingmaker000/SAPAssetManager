/*&========================================================================== *
 *&       P A C I F I C  G A S  &  E L E C T R I C  C O M P A N Y             *
 *&===========================================================================*
 *& Author         : R6CM(Ravi Challa)                                        *
 *& Date Started:  : 07/19/2023                                               *
 *& Program Name  :  ZOnNotificationPendigTasksReset.js                       *                                                     
 *& Description   :                                                           *
 *& This file is used to refresh notification count on list iew page          *
 *& and reset the page caption                                                *
 *&===========================================================================*
 *&---------------------------------------------------------------------------*
               P R O G R A M  C H A N G E  H I S T O R Y 
 *&---------------------------------------------------------------------------*/
/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function ZOnNotificationPendigTasksReset(context) {
 // refresh page    
    context.redraw();

 //   filter(context);
 var entitySet;
 var queryOption, totalQueryOption = ''; 
 var params = [];
 entitySet = 'MyNotificationHeaders';
 totalQueryOption = "";   
 queryOption = context.getGlobalDefinition('/SAPAssetManager/Globals/Notifications/ZNotificationTaskSupervisorQueryOption.global').getValue(); 
 let totalCountPromise = context.count('/SAPAssetManager/Services/AssetManager.service', entitySet, totalQueryOption);
 let countPromise = context.count('/SAPAssetManager/Services/AssetManager.service', entitySet, queryOption);
  
 return Promise.all([totalCountPromise, countPromise]).then(function(resultsArray) {
     let totalCount = resultsArray[0];
     let count = resultsArray[1];
     let caption;
     var localizeText;
     var localizeText_x_x;
     params.push(count);
     params.push(totalCount);
  
     localizeText = 'znotificationTasks_x';
     localizeText_x_x = 'znotificationTasks_x_x';  
   if (count === totalCount) {
       caption = context.localizeText(localizeText, [totalCount]);
     } else {
         caption = context.localizeText(localizeText_x_x, params);
     }
     return context.setCaption(caption);
 });
}