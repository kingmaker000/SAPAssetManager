import libCommon from '../../../../Common/Library/CommonLibrary';
import isAndroid from '../../../../Common/IsAndroid';

export default function ZzOilSampleListViewIconImages(context) {

    let binding = context.getBindingObject();
    let iconImage = [];

    // Check if oil sample taken
    if (binding.Batch) {
        iconImage.push('/SAPAssetManager/Images/stepCheckmarkIcon.png')
    }
    
    // Check if oil sample has local update
    if (libCommon.getTargetPathValue(context,'#Property:@sap.isLocal')) {
        iconImage.push(isAndroid(context) ? '/SAPAssetManager/Images/syncOnListIcon.android.png' : '/SAPAssetManager/Images/syncOnListIcon.png');
    }

    return iconImage;
}