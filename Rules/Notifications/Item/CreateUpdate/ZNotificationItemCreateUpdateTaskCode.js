import notification from '../../NotificationLibrary';
import common from '../../../Common/Library/CommonLibrary';
import userFeaturesLib from '../../../UserFeatures/UserFeaturesLibrary';
import libCom from '../../../Common/Library/CommonLibrary';

export default function ZNotificationItemCreateUpdateTaskCode(context) {

    var page = context.getPageProxy().getControl('FormCellContainer');
    if (!page.isContainer()) {
        return null;
    }
    var targetList = page.getControl('CodeLstPkr');

    var codegrp = context.getPageProxy().evaluateTargetPath('#Control:GroupLstPkr/#SelectedValue');
    if (codegrp) {
        libCom.setEditable(targetList, true);        
    }

}
