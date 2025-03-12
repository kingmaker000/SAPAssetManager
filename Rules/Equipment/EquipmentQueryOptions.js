import Logger from '../Log/Logger';
/**
 * Query options for the MyEquipments entityset shown on the equipment list view page.
 * @param context The PageProxy object.
 */
export default function EquipmentQueryOptions(context) {
    Logger.info(context.getGlobalDefinition('/SAPAssetManager/Globals/Logs/CategoryEquipment.global').getValue(), 'OData read called');
    //"#sap_mobile.MyWorkOrderHeader"
    let binding = context.binding;
    if (binding && binding['@odata.type'] === '#sap_mobile.MyWorkOrderHeader') {
        return `$expand=WorkCenter_Main_Nav,MeasuringPoints&$select=*,WorkCenter_Main_Nav/*,MeasuringPoints/Point&$filter=(WorkOrderHeader/any( wo: wo/OrderId eq '${binding.OrderId}' ) or WorkOrderOperation/WOHeader/any(wo: wo/OrderId eq '${binding.OrderId}' ) or WorkOrderSubOperation/WorkOrderOperation/WOHeader/any( wo: wo/OrderId eq '${binding.OrderId}' ))`;
    }
    if (binding && binding['@odata.type'] === '#sap_mobile.MyFunctionalLocation') {
        return '$expand=MeasuringPoints&$select=*,MeasuringPoints/Point';
    }
    let searchString = context.searchString;
    if (searchString) {
        let qob = context.dataQueryBuilder();
        //Begin PG&E REPLACE: Add additional fields to search list
        //qob.expand('ObjectStatus_Nav/SystemStatus_Nav,EquipDocuments,EquipDocuments/Document,WorkOrderHeader,WorkCenter_Main_Nav').orderBy('EquipId').select('ObjectStatus_Nav/SystemStatus_Nav/StatusText,WorkOrderHeader/OrderId,EquipDesc,EquipId,PlanningPlant,MaintPlant,WorkCenter');
        qob.expand('ObjectStatus_Nav/SystemStatus_Nav,EquipDocuments,EquipDocuments/Document,WorkOrderHeader,WorkCenter_Main_Nav,Address').orderBy('EquipId').select('ObjectStatus_Nav/SystemStatus_Nav/StatusText,WorkOrderHeader/OrderId,EquipDesc,EquipId,PlanningPlant,MaintPlant,WorkCenter,InventoryNum,ZzFeeder,ZzOperatingNum,ZzVault');
        //End PG&E REPLACE: Add additional fields to search list
        let filters = [
            //Begin PG&E INSERT: Expose additional fields to search
            `substringof('${searchString.toLowerCase()}', tolower(InventoryNum))`,
            `substringof('${searchString.toLowerCase()}', tolower(ZzOperatingNum))`,
            `substringof('${searchString.toLowerCase()}', tolower(ZzFeeder))`,
            `substringof('${searchString.toLowerCase()}', tolower(ZzVault))`,
            `substringof('${searchString.toLowerCase()}', tolower(Address/Street))`,
            //End PG&E INSERT: Expose additional fields to search            
            `substringof('${searchString.toLowerCase()}', tolower(EquipDesc))`,
            `substringof('${searchString.toLowerCase()}', tolower(WorkCenter_Main_Nav/PlantId))`,
            `substringof('${searchString.toLowerCase()}', tolower(WorkCenter_Main_Nav/WorkCenterDescr))`,
            `substringof('${searchString.toLowerCase()}', tolower(EquipId))`,
            `substringof('${searchString.toLowerCase()}', tolower(WorkCenter_Main_Nav/WorkCenterName))`,
            `substringof('${searchString.toLowerCase()}', tolower(WorkCenter_Main_Nav/ExternalWorkCenterId))`,
        ];
        qob.filter(filters.join(' or '));
        return qob;
    } else {
        return '$select=*,MeasuringPoints/Point,ObjectStatus_Nav/SystemStatus_Nav/StatusText,WorkOrderHeader/OrderId,Address/Street' +
            '&$orderby=EquipId' +
            '&$expand=MeasuringPoints,ObjectStatus_Nav/SystemStatus_Nav,EquipDocuments,EquipDocuments/Document,WorkOrderHeader,WorkCenter_Main_Nav,Address';
    }
}
