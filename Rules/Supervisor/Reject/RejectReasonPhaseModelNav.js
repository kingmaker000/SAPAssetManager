import libCom from '../../Common/Library/CommonLibrary';
import libWOStatus from '../../WorkOrders/MobileStatus/WorkOrderMobileStatusLibrary';
import libOPStatus from '../../Operations/MobileStatus/OperationMobileStatusLibrary';

//Reject an operation as a supervisor
export default function RejectReasonPhaseModelNav(context) {

    libCom.setStateVariable(context, 'SupervisorRejectSuccess', false);
    libCom.removeStateVariable(context, 'SupervisorRejectReason');
    return context.executeAction('/SAPAssetManager/Actions/Supervisor/Reject/RejectReasonNav.action').then(() => {
        if (libCom.getStateVariable(context, 'SupervisorRejectSuccess')) {
            let statusElement = libCom.getStateVariable(context, 'PhaseModelStatusElement');
            let rejectReason = libCom.getStateVariable(context, 'SupervisorRejectReason');
            return MobileStatusUpdateOverride(context, statusElement, rejectReason).then(() => {
                return UpdateStatus(context);
            });
        }
        return false;
    });
}

function UpdateStatus(context) {
    let businessObject = context.binding;

    if (businessObject['@odata.type'] === '#sap_mobile.MyWorkOrderHeader') {
        libWOStatus.didSetWorkOrderRejected(context);
    } else if (businessObject['@odata.type'] === '#sap_mobile.MyWorkOrderOperation') {
        libOPStatus.didSetOperationRejected(context);
    }
    return Promise.resolve(true);
}

/**
 * Update the mobile status to rejected
 * @param {*} context
 * @param {*} status
 * @returns
 */
function MobileStatusUpdateOverride(context, status, rejectReason) {
    return context.executeAction({
        'Name': '/SAPAssetManager/Actions/MobileStatus/MobileStatusUpdate.action',
        'Properties':
        {
            'Properties':
            {
                'MobileStatus': status.MobileStatus,
                'EAMOverallStatusProfile': status.EAMOverallStatusProfile,
                'EAMOverallStatus': status.EAMOverallStatus,
                'Status': status.Status,
                'EffectiveTimestamp': '/SAPAssetManager/Rules/DateTime/CurrentDateTime.js',
                'CreateUserGUID': '/SAPAssetManager/Rules/UserPreferences/UserPreferencesUserGuidOnCreate.js',
                'CreateUserId': '/SAPAssetManager/Rules/MobileStatus/GetSAPUserId.js',
                'ReasonCode': rejectReason,
            },
            'Target':
            {
                'EntitySet': 'PMMobileStatuses',
                'ReadLink' : '/SAPAssetManager/Rules/MobileStatus/MobileStatusReadLink.js',
                'Service': '/SAPAssetManager/Services/AssetManager.service',
            },
            'Headers': {
                'OfflineOData.NonMergeable': true,
            },
            'UpdateLinks':
            [{
                'Property': 'OverallStatusCfg_Nav',
                'Target':
                {
                    'EntitySet': 'EAMOverallStatusConfigs',
                    'ReadLink': `EAMOverallStatusConfigs(Status='${status.Status}',EAMOverallStatusProfile='${status.EAMOverallStatusProfile}')`,
                },
            }],
            'ShowActivityIndicator': true,
            'OnFailure': '/SAPAssetManager/Actions/CreateUpdateDelete/UpdateEntityFailureMessage.action',
        },
    });
}
