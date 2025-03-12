
import libCom from '../../../Common/Library/CommonLibrary';

export default function RequiredFields(context) {
    let required = ['ItemDescription'];

    const notifType = context.binding.NotificationType;

    var notifTypesEnablePart = new Array();
    var notifTypesEnableDamage = new Array();
    var notifTypesEnableActivity = new Array();
    notifTypesEnablePart = libCom.getAppParam(context, 'ZNOTIFICATION_CODES', 'NOTypes.Enable.Part').split(",");
    notifTypesEnableDamage = libCom.getAppParam(context, 'ZNOTIFICATION_CODES', 'NOTypes.Enable.Damage').split(",");
    notifTypesEnableActivity = libCom.getAppParam(context, 'ZNOTIFICATION_CODES', 'NOTypes.Enable.Activity').split(",");

    if (notifTypesEnablePart.includes(notifType)) {
        required.push('PartGroupLstPkr', 'PartDetailsLstPkr');
    }

    if (notifTypesEnableDamage.includes(notifType)) {
        required.push('DamageGroupLstPkr', 'DamageDetailsLstPkr');
    }
    if (notifTypesEnableActivity.includes(notifType)) {
        required.push('GroupLstPkr', 'CodeLstPkr');
    }

    return required;
}
