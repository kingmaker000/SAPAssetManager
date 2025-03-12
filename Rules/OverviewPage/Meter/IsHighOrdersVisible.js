import MeterLib from '../../Meter/Common/MeterLibrary';
import userFeaturesLib from '../../UserFeatures/UserFeaturesLibrary';
import libSuper from '../../Supervisor/SupervisorLibrary';
/*&========================================================================== *
 *&       P A C I F I C  G A S  &  E L E C T R I C  C O M P A N Y             *
 *&===========================================================================*
 *& Author         : R6CM(Ravi Challa)                                        *
 *& Date Started:  : 07/19/2023                                               *
 *& Program Name  :  IsHighOrdersVisible.js                                   *                                                     
 *& Description   :                                                           *
 *& This function is used to hide supervisor pending                          *
 *& high order in overview page                                               *                                                                          
 *&===========================================================================*
 *&---------------------------------------------------------------------------*
               P R O G R A M  C H A N G E  H I S T O R Y 
 *&---------------------------------------------------------------------------*/
// Begin of Comment R6CM
//export default function IsHighOrdersVisible(context) {
////    return userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/Meter.global').getValue()) ? (MeterLib.getMeterReaderFlag()) : true;
//}
// End of comment R6CM
export default function IsHighOrdersVisible(context) {
    if (libSuper.isSupervisorFeatureEnabled(context)) {
        return libSuper.isUserSupervisor(context).then(isSupervisor => {
            if (isSupervisor) {
                return false;
            }
            return userFeaturesLib.isFeatureEnabled(context, context.getGlobalDefinition('/SAPAssetManager/Globals/Features/Meter.global').getValue()) ? (MeterLib.getMeterReaderFlag()) : true;
        });
    } else {
        return Promise.resolve(true);
    }
}