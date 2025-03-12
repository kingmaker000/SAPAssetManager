import notification from '../NotificationLibrary';
import updateGroupPickers from './UpdateGroupPickers';
import userFeaturesLib from '../../UserFeatures/UserFeaturesLibrary';
import prioritySelector from './NotificationCreateUpdatePrioritySelector';
import libCom from '../../Common/Library/CommonLibrary';

export default function NotificationCreateUpdateTypeOnValueChange(context) {

    var page = context.getPageProxy().getControl('FormCellContainer');
    if (!page.isContainer()) {
        return null;
    }
    var targetList = page.getControl('TypeLstPkr');
    libCom.setEditable(targetList, true);   

    // hide or unhide the defect codes based on the Notification type selected
    var page = context.getPageProxy().getControl('FormCellContainer');
    var selectedNotifType = page.getControl('TypeLstPkr').getValue()[0].ReturnValue;
    var PartDetailsLstPkr = page.getControl('PartDetailsLstPkr').getValue(); 
    var DamageDetailsLstPkr = page.getControl('DamageDetailsLstPkr').getValue(); 

    var notifTypesEnablePart = new Array();
    var notifTypesEnableDamage = new Array();
    var notifTypesEnableActivity = new Array();
    notifTypesEnablePart = libCom.getAppParam(context, 'ZNOTIFICATION_CODES', 'NOTypes.Enable.Part').split(",");
    notifTypesEnableDamage = libCom.getAppParam(context, 'ZNOTIFICATION_CODES', 'NOTypes.Enable.Damage').split(",");
    notifTypesEnableActivity = libCom.getAppParam(context, 'ZNOTIFICATION_CODES', 'NOTypes.Enable.Activity').split(",");

    if (!notifTypesEnablePart.includes(selectedNotifType)) {
        page.getControl('PartGroupLstPkr').setVisible(false);
        page.getControl('PartDetailsLstPkr').setVisible(false);
    } else {
        page.getControl('PartGroupLstPkr').setVisible(true);
        page.getControl('PartDetailsLstPkr').setVisible(true);
    }

    if (!notifTypesEnableDamage.includes(selectedNotifType)) {
        page.getControl('DamageGroupLstPkr').setVisible(false);
        page.getControl('DamageDetailsLstPkr').setVisible(false);
    } else {
        if(PartDetailsLstPkr.length > 0) {
            page.getControl('DamageGroupLstPkr').setVisible(true);
            page.getControl('DamageDetailsLstPkr').setVisible(true);
        }
    }

    if (!notifTypesEnableActivity.includes(selectedNotifType)) {
        page.getControl('GroupLstPkr').setVisible(false);
        page.getControl('CodeLstPkr').setVisible(false);
    } else {
        if(DamageDetailsLstPkr.length > 0) {
            page.getControl('GroupLstPkr').setVisible(true);
            page.getControl('CodeLstPkr').setVisible(true);
        }

    }

    if (userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/QM.global').getValue())) {
        return prioritySelector(context).finally(() => {
            return notification.setFailureAndDetectionGroupQuery(context);
        });
    } else {
        return notification.NotificationCreateUpdatePrioritySelector(context).then(() => updateGroupPickers(context.getPageProxy())).finally(() => {
            return notification.setFailureAndDetectionGroupQuery(context);
        });
    }
}
