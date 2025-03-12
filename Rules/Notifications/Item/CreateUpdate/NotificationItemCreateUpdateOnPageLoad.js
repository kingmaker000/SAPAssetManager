import libCommon from '../../../Common/Library/CommonLibrary';
import style from '../../../Common/Style/StyleFormCellButton';
import hideCancel from '../../../ErrorArchive/HideCancelForErrorArchiveFix';
import libNotif from '../../NotificationLibrary';
import ZNotificationItemCreateUpdateDamage from './ZNotificationItemCreateUpdateDamage';

export default function NotificationItemCreateUpdateOnPageLoad(context) {
    var caption;
    hideCancel(context);
    if (libCommon.IsOnCreate(context))	{
        caption = context.localizeText('add_notification_item');
    } else	{
        caption = context.localizeText('edit_notification_item');
    }
    context.setCaption(caption);
    style(context, 'DiscardButton');
    libCommon.saveInitialValues(context);

    
        // hide or unhide the defect codes based on the Notification type selected
        var page = context.getPageProxy().getControl('FormCellContainer');
        if (libCommon.IsOnCreate(context))	{
            var selectedNotifType = context.binding.NotificationType;
        } else {
            var selectedNotifType = context.binding.Notification.NotificationType;
            page.getControl('DamageGroupLstPkr').setVisible(true);
            page.getControl('DamageDetailsLstPkr').setVisible(true);
            page.getControl('GroupLstPkr').setVisible(true);
            page.getControl('CodeLstPkr').setVisible(true);

            //set Editable
            page.getControl('PartGroupLstPkr').setEditable(true);
            page.getControl('PartDetailsLstPkr').setEditable(true);
            page.getControl('DamageGroupLstPkr').setEditable(true);
            page.getControl('DamageDetailsLstPkr').setEditable(true);
            page.getControl('GroupLstPkr').setEditable(true);
            page.getControl('CodeLstPkr').setEditable(true);

            var container = context.getControls()[0];
            // Set Object Damag Codepicker
            libNotif.NotificationDamageCodeQuery(context).then(query => {
                let specifier = container.getControl('DamageDetailsLstPkr').getTargetSpecifier();
                specifier.setQueryOptions(query);
                container.getControl('DamageDetailsLstPkr').setTargetSpecifier(specifier);
            });
            // Set Object task Codepicker
            libNotif.NotificationActivityCodeQuery(context).then(query => {
                let specifier = container.getControl('CodeLstPkr').getTargetSpecifier();
                specifier.setQueryOptions(query);
                container.getControl('CodeLstPkr').setTargetSpecifier(specifier);
            });
        }
        var notifTypesEnablePart = new Array();
        notifTypesEnablePart = libCommon.getAppParam(context, 'ZNOTIFICATION_CODES', 'NOTypes.Enable.Part').split(",");
    
        if (notifTypesEnablePart.includes(selectedNotifType)) {
            page.getControl('PartGroupLstPkr').setVisible(true);
            page.getControl('PartDetailsLstPkr').setVisible(true);
        }

}
