import libCom from '../../../../Common/Library/CommonLibrary';
import libVal from '../../../../Common/Library/ValidationLibrary';
export default function ZzOilSampleDoneAction(context) {
    let dict = libCom.getControlDictionaryFromPage(context);
    if (libVal.evalIsEmpty(libCom.getListPickerValue(dict.BatchNumberLstPkr.getValue()))) {
        let message = context.localizeText('field_is_required');
        libCom.setInlineControlError(context, dict.BatchNumberLstPkr, message);
        dict.BatchNumberLstPkr.applyValidation();
        return Promise.reject();
    }    
    return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSampleCollectChangeSet.action');
}