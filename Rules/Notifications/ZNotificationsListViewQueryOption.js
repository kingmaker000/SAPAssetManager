import libVal from '../Common/Library/ValidationLibrary';
import libPersona from '../Persona/PersonaLibrary';
import phaseModel from '../Common/IsPhaseModelEnabled';
import phaseModelExpands from '../PhaseModel/PhaseModelListViewQueryOptionExpand';
import notificationsListGetTypesQueryOption from './ListView/NotificationsListGetTypesQueryOption';

export default function ZNotificationsListViewQueryOption(context) {
                     
    return notificationsListGetTypesQueryOption(context).then(typesQueryOption => {
      // read notifications pending for supervisor approval  
        let queryBuilder = context.dataQueryBuilder();
        let filters = [];
        let filter = '';
        // logic is to read this Odata query string from gloabl variable to avoid coding the query in two different places
        // ZNotificationTaskSupervisorQueryOption.global is used to count supervisor dashboard notifications with pending tasks
        //queryBuilder.expand('Tasks/TaskMobileStatus_Nav,WorkOrder,NotifPriority,NotifMobileStatus_Nav,NotifDocuments,NotifDocuments/Document,HeaderLongText,FunctionalLocation,Equipment,NotifMobileStatus_Nav/OverallStatusCfg_Nav');  
        //var baseQuery = "((Tasks/any(itm: (itm/TaskMobileStatus_Nav/MobileStatus ne 'COMPLETED' and itm/TaskCode eq 'SUPA'))) or (Tasks/any(itm: (itm/TaskMobileStatus_Nav/MobileStatus ne 'COMPLETED' and itm/TaskCode eq 'NPSA'))))";
        
        // read global query 
        var zGlobalqueryOption = "";
        zGlobalqueryOption = context.getGlobalDefinition('/SAPAssetManager/Globals/Notifications/ZNotificationTaskSupervisorQueryOption.global').getValue();
        //replace expand part zfinalquery = zGlobalqueryOption.replace('$expand=', '');       
        //split the query into two parts: expand and filter
        var zquerysplit = zGlobalqueryOption.split('&$filter=');
        var zexpandpart = zquerysplit[0];
        var zfilterpart = zquerysplit[1];
        // pass expand part to query builder expand
        queryBuilder.expand(zexpandpart);
        // pass filter part to query builder filter
        var baseQuery = zfilterpart;

        // orderby
        queryBuilder.orderBy('NotificationNumber,Priority,NotifMobileStatus_Nav/MobileStatus');
        
        if (context.searchString) {
            filters.push(`substringof('${context.searchString.toLowerCase()}', tolower(NotificationNumber))`);
            filters.push(`substringof('${context.searchString.toLowerCase()}', tolower(NotificationDescription))`);
        }

        if (filters.length > 0) {
            filter = baseQuery + ' and (' + filters.join(' or ') + ')';
        } else {
            filter = baseQuery;
        }

        queryBuilder.filter(filter);


        if (phaseModel(context)) {
            let phaseModelNavlinks = phaseModelExpands('QMI');
            queryBuilder.expand(phaseModelNavlinks);
        }    
    
        if (!libVal.evalIsEmpty(context.binding) && context.binding['@odata.type'] === '#sap_mobile.MyEquipment') {
            queryBuilder.orderBy('Priority');
            queryBuilder.filter(`HeaderEquipment eq '${context.binding.EquipId}'`);
            return queryBuilder;
        } else if (!libVal.evalIsEmpty(context.binding) && context.binding['@odata.type'] === '#sap_mobile.InspectionCharacteristic') {
            queryBuilder.filter(`Items/any(itm: itm/InspectionChar_Nav/InspectionLot eq '${context.binding.InspectionLot}' and itm/InspectionChar_Nav/InspectionNode eq '${context.binding.InspectionNode}' and itm/InspectionChar_Nav/InspectionChar eq '${context.binding.InspectionChar}' and itm/InspectionChar_Nav/SampleNum eq '${context.binding.SampleNum}')`);
            return queryBuilder;
        }  else {
            return queryBuilder;
        }
    });
}
