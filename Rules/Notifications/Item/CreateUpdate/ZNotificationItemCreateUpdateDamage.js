import notification from '../../NotificationLibrary';
import common from '../../../Common/Library/CommonLibrary';
import userFeaturesLib from '../../../UserFeatures/UserFeaturesLibrary';

export default function ZNotificationItemCreateUpdateDamage(context) {
    context.clearValidation();
    let binding = context.getPageProxy().binding;
    if (userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/QM.global').getValue()) && binding) {
        var selection = context.getValue();
        
        var page = context.getPageProxy().getControl('FormCellContainer');
        var targetList = context.getPageProxy().evaluateTargetPathForAPI('#Control:DamageDetailsLstPkr'); 
        var targetListGrp = context.getPageProxy().evaluateTargetPathForAPI('#Control:DamageGroupLstPkr'); 
        var specifier = targetList.getTargetSpecifier();

        let notifLookup = Promise.resolve(binding.NotificationType);

        if (context.binding.EAMChecklist_Nav) {
            return notification.NotificationItemCreateUpdateDamage(context);
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
            return notification.NotificationItemCreateUpdateDamage(context).then(() => {
                if (context.getPageProxy().evaluateTargetPath('#Control:DamageDetailsLstPkr').getValue().length > 0) {
                    return notification.NotificationItemCreateUpdateActivity(context);                    
                }
            });
        }
        return notifLookup.then(type => {
            return context.read('/SAPAssetManager/Services/AssetManager.service', `NotificationTypes('${type}')`, [], '').then(notifType => {
                let defect = (binding['@odata.type'] === '#sap_mobile.InspectionCharacteristic' || (binding.InspectionLot && Number(binding.InspectionLot) !== 0)); // Are we working with a Defect Notification or not?
                if (notifType.getItem(0).NotifCategory === '02' || defect) { // QM/PM Notification, Defect

                    selection = selection[0].ReturnValue;
                    var qry = "$filter=ObjectPartCode eq '" + selection + "'&$orderby=DamageCode";  
                    var damCodes = [];

                    return context.read('/SAPAssetManager/Services/AssetManager.service', 'ZFdaMatrices', [], qry).then(function (results) {
                        if (results && results.length > 0) {
                            results.forEach(function (element) {
                                damCodes.push(
                                    {
                                        'PartCode': element.ObjectPartCode,
                                        'DamageCode': element.DamageCode,
                                        'ActCode': element.TaskCode,
                                    });    
                            });

                            var uniqueCodes = damCodes.reduce((unique, o) => {
                                if(!unique.some(obj => obj.PartCode === o.PartCode && obj.DamageCode === o.DamageCode)) {
                                  unique.push(o);
                                }
                                return unique;
                            },[]);
    
                            var uniqueCodeKeys = [];
                            for (let i = 0; i < uniqueCodes.length; i++) {
                                uniqueCodeKeys.push(`(DamageCode eq '${uniqueCodes[i].DamageCode}' and ObjectPartCode eq '${uniqueCodes[i].PartCode}' and TaskCode eq '${uniqueCodes[i].ActCode}')`);
                            }
                            let customFilter = uniqueCodeKeys.join(' or ');
                            var qry = "$filter=" + customFilter + "&$orderby=DamageCode";
                            specifier.setQueryOptions(qry);

                            // set the Damage Group and code fields Editable  
                            common.setEditable(targetList, true); 
                            common.setEditable(targetListGrp, true);

                            // set the Damage Group and code fields visible 
                            page.getControl('DamageGroupLstPkr').setVisible(true);
                            page.getControl('DamageDetailsLstPkr').setVisible(true);
                            page.getControl('DamageDetailsLstPkr').clearValidation();

                            if (uniqueCodes.length === 1) {
                                // set the activity group and activity code fields visible 
                                page.getControl('GroupLstPkr').setVisible(true);
                                page.getControl('CodeLstPkr').setVisible(true);
    
                                // set the activity group and activity code fields visible 
                                page.getControl('GroupLstPkr').setEditable(true);
                                if(page.getControl('GroupLstPkr').getValue().length === 1) {
                                    page.getControl('CodeLstPkr').setEditable(true);   
                                }
                            } else {
                                targetList.setPickerItems(uniqueCodes);                            
                                page.getControl('DamageDetailsLstPkr').setValue(''); 
                                page.getControl('CodeLstPkr').setValue('');                          
                            }
    
                            return targetList.setTargetSpecifier(specifier).then(() => {
                                if (context.getPageProxy().evaluateTargetPath('#Control:DamageDetailsLstPkr').getValue().length > 0) {
                                    return notification.NotificationItemCreateUpdateActivity(context);                    
                                }
                            });
                        } 
    
                    }).catch((error) => {
                        Logger.info('Error reading ZFdaMatrices' + error);
                        return false;
                    });                      
                } else { // PM Notification, No Defect
                    return notification.NotificationItemCreateUpdateDamage(context).then(() => {
                        if (context.getPageProxy().evaluateTargetPath('#Control:DamageDetailsLstPkr').getValue().length > 0) {
                            return notification.NotificationItemCreateUpdateActivity(context);                    
                        }
                    });
                }
            });
        });
    } else {
        return notification.NotificationItemCreateUpdateDamage(context).then(() => {
            if (context.getPageProxy().evaluateTargetPath('#Control:DamageDetailsLstPkr').getValue().length > 0) {
                return notification.NotificationItemCreateUpdateActivity(context);                    
            }
        });
    }
}
