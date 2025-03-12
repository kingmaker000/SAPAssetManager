import libCom from '../Common/Library/CommonLibrary';

export default function MobileStatusUpdateOverride(context, status, mobileStatusNavLink, successAction) {
    
    //Force these detail pages to recalculate after updating a mobile status to keep toolbar in sync
    libCom.removeStateVariable(context, 'isAnyOperationStarted', 'WorkOrderOperationDetailsPage');
    libCom.removeStateVariable(context, 'isAnyWorkOrderStarted', 'WorkOrderDetailsPage');

    const COMPLETE = libCom.getAppParam(context, 'MOBILESTATUS', context.getGlobalDefinition('/SAPAssetManager/Globals/MobileStatus/ParameterNames/CompleteParameterName.global').getValue());
    const REVIEW = libCom.getAppParam(context, 'MOBILESTATUS', context.getGlobalDefinition('/SAPAssetManager/Globals/MobileStatus/ParameterNames/ReviewParameterName.global').getValue());
    let ignore = false;

    //////////////////////////////////////////////////////////////////////////
    // Begin PG&E INSERT (D0RB)
    //
    // Add confirmation popover dialog for specific mobile statuses
    let validationRule = '';
    switch (status.MobileStatus) {
        case REVIEW:
            validationRule = '/SAPAssetManager/Rules/MobileStatus/ZzMobileStatusReviewOperationDialog.js';           
            break;
        case COMPLETE:
            validationRule = '/SAPAssetManager/Rules/MobileStatus/ZzMobileStatusCompleteOperationDialog.js';           
            break;
    }   
    // End PG&E INSERT (D0RB)
    //////////////////////////////////////////////////////////////////////////

    if (context.binding['@odata.type'] === '#sap_mobile.MyWorkOrderHeader') { //We pass up a dummy complete record here, since we don't yet know if complete checks will pass
        if (status.MobileStatus === COMPLETE || status.MobileStatus === REVIEW) {
            ignore = true;
            libCom.setStateVariable(context, 'MobileStatusReadLinkSaveRequired', context.binding[mobileStatusNavLink]['@odata.readLink']);
            let dummy = status.MobileStatus === COMPLETE ? 'COMPLETE': 'REVIEW';
            status.MobileStatus = 'D-' + dummy; //Need a dummy status so the actual status can be updated on this record later after successful checks
        }
    }

    if (context.binding['@odata.type'] === '#sap_mobile.MyWorkOrderOperation') { //We pass up a dummy complete record here, since we don't yet know if complete checks will pass
        if (status.MobileStatus === COMPLETE || status.MobileStatus === REVIEW) {
            ignore = true;
            let dummy = status.MobileStatus === COMPLETE ? 'COMPLETE': 'REVIEW';
            status.MobileStatus = 'D-' + dummy; //Need a dummy status so the actual status can be updated on this record later after successful checks
        }
    }

    return {
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
            },
            'Target':
            {
                'EntitySet': 'PMMobileStatuses',
                'ReadLink' : context.binding[mobileStatusNavLink]['@odata.readLink'],
                'Service': '/SAPAssetManager/Services/AssetManager.service',
            },
            'Headers': {
                'OfflineOData.NonMergeable': true,
                'Transaction.Ignore': ignore,
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
            'OnSuccess': successAction,
    //////////////////////////////////////////////////////////////////////////
    // Begin PG&E INSERT (D0RB)
    //
    // Add confirmation dialog prerequisite to action
            'ValidationRule': validationRule,
    //End PG&E INSERT (D0RB)
    //////////////////////////////////////////////////////////////////////////

            'ActionResult': {
                '_Name': 'MobileStatusUpdate',
            },
            'ShowActivityIndicator': true,
        },
    };
}