/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
import libNotif from './NotificationLibrary';
import common from '../Common/Library/CommonLibrary';

export default function ZQMNotificationCreateUpdateOnLoaded(context) {

    var container = context.getControls()[0];

    // Set Activity Group picker
    libNotif.NotificationItemTaskActivityGroupQuery(context, 'CatTypeActivities').then(query => {
        let specifier = container.getControl('GroupLstPkr').getTargetSpecifier();
        specifier.setQueryOptions(query);
        container.getControl('GroupLstPkr').setTargetSpecifier(specifier);
    });

    // hide or unhide the defect codes based on the Notification type selected
    var page = context.getPageProxy().getControl('FormCellContainer');
    var selectedNotifType = page.getControl('TypeLstPkr').getValue()[0].ReturnValue;
    var notifTypesEnablePart = new Array();
    notifTypesEnablePart = common.getAppParam(context, 'ZNOTIFICATION_CODES', 'NOTypes.Enable.Part').split(",");

    if (notifTypesEnablePart.includes(selectedNotifType)) {
        page.getControl('PartGroupLstPkr').setVisible(true);
        page.getControl('PartDetailsLstPkr').setVisible(true);
    }


}