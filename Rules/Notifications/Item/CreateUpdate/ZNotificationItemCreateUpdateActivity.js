import notification from '../../NotificationLibrary';
import userFeaturesLib from '../../../UserFeatures/UserFeaturesLibrary';
import common from '../../../Common/Library/CommonLibrary';

export default function ZNotificationItemCreateUpdateActivity(context) {
    context.clearValidation();
    let binding = context.getPageProxy().binding;
    if (userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/QM.global').getValue()) && binding) {
        var selection = context.getValue();
        var targetList = context.getPageProxy().evaluateTargetPathForAPI('#Control:CodeLstPkr'); 
        var targetListGrp = context.getPageProxy().evaluateTargetPathForAPI('#Control:GroupLstPkr');
        var page = context.getPageProxy().getControl('FormCellContainer');
        var specifier = targetList.getTargetSpecifier();
        let notifLookup = Promise.resolve(binding.NotificationType);

        if (context.binding.EAMChecklist_Nav) {
            return notification.NotificationItemCreateUpdatePart(context);
        }

        if (binding['@odata.type'] !== '#sap_mobile.MyNotificationHeader' && binding['@odata.type']) {
            if (binding['@odata.type'] === '#sap_mobile.MyNotificationItem') {
                binding = binding.Notification;
                notifLookup = Promise.resolve(binding.NotificationType);
            } else if (binding['@odata.type'] === '#sap_mobile.InspectionCharacteristic') {
                notifLookup = context.read('/SAPAssetManager/Services/AssetManager.service', `OrderTypes(PlanningPlant='${context.binding.InspectionLot_Nav.WOHeader_Nav.PlanningPlant}',OrderType='${context.binding.InspectionLot_Nav.WOHeader_Nav.OrderType}')`, [], '').then(result => {
                    return result.getItem(0).QMNotifType;
                });
            } else {
                binding = common.getStateVariable(context, 'CreateNotification');
                notifLookup = Promise.resolve(binding.NotificationType);
            }
        } else {
            return notification.NotificationItemCreateUpdateActivity(context);
        }
        return notifLookup.then(type => {
            return context.read('/SAPAssetManager/Services/AssetManager.service', `NotificationTypes('${type}')`, [], '').then(notifType => {
                let defect = (binding['@odata.type'] === '#sap_mobile.InspectionCharacteristic' || (binding.InspectionLot && Number(binding.InspectionLot) !== 0)); // Are we working with a Defect Notification or not?
                if (notifType.getItem(0).NotifCategory === '02' || defect) { // QM/PM Notification, Defect
                    selection = selection[0].ReturnValue;
                    
                    specifier.setDisplayValue('{{#Property:TaskCode}} - {{#Property:ActivityDesc}}');
                    specifier.setReturnValue('{TaskCode}');

                    specifier.setEntitySet('ZFdaMatrices');
                    specifier.setService('/SAPAssetManager/Services/AssetManager.service');
                    
                    let part = context.getPageProxy().evaluateTargetPath('#Control:PartDetailsLstPkr/#SelectedValue');
                    let newQuery = "$filter=ObjectPartCode eq '" + part + "' and DamageCode eq '" + selection + "'&$orderby=TaskCode";
                    specifier.setQueryOptions(newQuery);

                    // set the activity group and activity code fields editable
                    common.setEditable(targetList, true); 
                    common.setEditable(targetListGrp, true);

                    // set the activity group and activity code fields visible 
                    page.getControl('GroupLstPkr').setVisible(true);
                    page.getControl('CodeLstPkr').setVisible(true);

                    return targetList.setTargetSpecifier(specifier);
                } else { // PM Notification, No Defect
                    return notification.NotificationItemCreateUpdateActivity(context);
                }
            });
        });
    } else {
        return notification.NotificationItemCreateUpdateActivity(context);
    }
}
