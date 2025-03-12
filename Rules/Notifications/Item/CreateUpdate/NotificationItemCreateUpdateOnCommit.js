import ComLib from '../../../Common/Library/CommonLibrary';
import NotificationLib from '../../../Notifications/NotificationLibrary';
import lamCopy from '../../CreateUpdate/NotificationItemCreateLAMCopy';


export default function NotificationItemCreateUpdateOnCommit(clientAPI) {

    return NotificationLib.NotificationItemCreateUpdateValidation(clientAPI).then((isValid) => {
        if (isValid) {
            if (ComLib.IsOnCreate(clientAPI)) {
                if (ComLib.isOnChangeset(clientAPI)) {
                    return clientAPI.executeAction({
                        'Name': '/SAPAssetManager/Actions/Notifications/Item/NotificationItemCreate.action',
                        'Properties': {
                            'OnSuccess' : '',
                        },
                    }).then((actionResult) => {
                        // return lamCopy(clientAPI);
                            let data = JSON.parse(actionResult.data);
                            return clientAPI.executeAction({
                                'Name': '/SAPAssetManager/Actions/Notifications/Item/NotificationItemActivityCreate.action',
                                'Properties': {
                                    'Properties':
                                    {
                                        'NotificationNumber': data.NotificationNumber,
                                        'ItemNumber' : data.ItemNumber,
                                        "ActivitySequenceNumber" : "/SAPAssetManager/Rules/Notifications/Item/Activity/GenerateNotificationItemActivityID.js",
                                        "ActivityText" : data.ItemText,
                                        "ActivityCodeGroup": "/SAPAssetManager/Rules/Notifications/GroupLstPkrValue.js",
                                        "ActivityCode" : "/SAPAssetManager/Rules/Notifications/CodeLstPkrValue.js",
                                        "ActivitySortNumber" : data.ItemNumber
                                    },
                                    'Headers':
                                    {
                                        'OfflineOData.RemoveAfterUpload': 'true',
                                        'OfflineOData.TransactionID': data.NotificationNumber,
                                    },
                                    'CreateLinks':
                                    [{
                                        'Property' : 'Item',
                                        'Target':
                                        {
                                            'EntitySet' : 'MyNotificationItems',
                                            'ReadLink' : data['@odata.readLink'],
                                        },
                                    }],
                                    'OnSuccess' : '',
                                },
                            });
                    }).then(() => {
                        clientAPI.executeAction('/SAPAssetManager/Actions/Page/ClosePageNextChangeset.action');
                    });
                } else {
                    // If this is not already a change set, we want to make it one
                    ComLib.setOnChangesetFlag(clientAPI, true);
                    ComLib.resetChangeSetActionCounter(clientAPI);
                    ComLib.setStateVariable(clientAPI, 'ObjectCreatedName', 'NotificationItem');
                    let notificationItemCreateChangeSet = '/SAPAssetManager/Actions/Notifications/Item/NotificationItemCreate.action';
                    return clientAPI.executeAction(notificationItemCreateChangeSet).then((actionResult) => {
                        // return lamCopy(clientAPI);
                    // }).then(() => {
                    // }).then(actionResult => {
                        // let createActivity = !!(function() { try { return clientAPI.evaluateTargetPath('#Control:ActivityDescription/#Value'); } catch (exc) { return ''; } })();
                        // if (createActivity) {
                            let data = JSON.parse(actionResult.data);
                            return clientAPI.executeAction({
                                'Name': '/SAPAssetManager/Actions/Notifications/Item/NotificationItemActivityCreate.action',
                                'Properties': {
                                    'Properties':
                                    {
                                        'NotificationNumber': data.NotificationNumber,
                                        'ItemNumber' : data.ItemNumber,
                                        "ActivitySequenceNumber" : "/SAPAssetManager/Rules/Notifications/Item/Activity/GenerateNotificationItemActivityID.js",
                                        "ActivityText" : data.ItemText,
                                        "ActivityCodeGroup": "/SAPAssetManager/Rules/Notifications/GroupLstPkrValue.js",
                                        "ActivityCode" : "/SAPAssetManager/Rules/Notifications/CodeLstPkrValue.js",
                                        "ActivitySortNumber" : data.ItemNumber
                                    },
                                    'Headers':
                                    {
                                        'OfflineOData.RemoveAfterUpload': 'true',
                                        'OfflineOData.TransactionID': data.NotificationNumber,
                                    },
                                    'CreateLinks':
                                    [{
                                        'Property' : 'Item',
                                        'Target':
                                        {
                                            'EntitySet' : 'MyNotificationItems',
                                            'ReadLink' : data['@odata.readLink'],
                                        },
                                    }],
                                    'OnSuccess' : '',
                                },
                            });
                        // } else {
                        //     return Promise.reject({'skip': true}); // Skip cause create
                        // }
                    }).then(() => {
                        clientAPI.executeAction('/SAPAssetManager/Actions/Page/ClosePageNextChangeset.action');
                    });
                }
            } else {
                return clientAPI.executeAction('/SAPAssetManager/Actions/Notifications/Item/NotificationItemUpdate.action');
            }
        } else {
            return Promise.resolve(false);
        }
    });
}
