import failureModeGroupValue from './NotificationCreateUpdateQMCodeGroupValue';
import libCom from '../../Common/Library/CommonLibrary';
import IsPhaseModelEnabled from '../../Common/IsPhaseModelEnabled';

export default function RequiredFields(context) {
    let required = ['NotificationDescription', 'TypeLstPkr'];

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Begin PG&E Enhancement (D0RB)
    // Make Priority required
    if ((function () { try { return context.evaluateTargetPathForAPI('#Control:PrioritySeg').visible; } catch (exc) { return false; } })()) {
        required.push('PrioritySeg');
    }
    else {
        required.push('PriorityLstPkr');
    }
    // End PG&E Enhancement (D0RB)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

    // eslint-disable-next-line brace-style
    if ((function () { try { return context.evaluateTargetPathForAPI('#Control:PartnerPicker1').visible; } catch (exc) { return false; } })()) {
        required.push('PartnerPicker1');
    }

    // eslint-disable-next-line brace-style
    if ((function () { try { return context.evaluateTargetPathForAPI('#Control:PartnerPicker2').visible; } catch (exc) { return false; } })()) {
        required.push('PartnerPicker2');
    }

    if (IsPhaseModelEnabled(context)) {

        //If a Failure Mode Group has been entered then Failure Mode Code is required or else backend will throw an error
        if (failureModeGroupValue(context)) {
            required.push('QMCodeListPicker');
        }

        //If a detection group has been entered then the method is required
        let detectionGroup = libCommon.getTargetPathValue(context, '#Control:DetectionGroupListPicker/#Value');
        if (detectionGroup) {
            required.push('DetectionMethodListPicker');
        }
    }

    const notifType = (() => {
        try {
            return context.evaluateTargetPath('#Control:TypeLstPkr/#SelectedValue');
        } catch (e) {
            return '';
        }
    })();

    //Determine if we are on edit vs. create
    let onCreate = libCom.IsOnCreate(context);
    if (onCreate) {
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
    }    

    return required;
}
