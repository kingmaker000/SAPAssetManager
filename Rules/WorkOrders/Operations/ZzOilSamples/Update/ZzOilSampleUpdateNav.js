import libCommon from '../../../../Common/Library/CommonLibrary';

export default function ZzOilSampleUpdateNav(context) {
    //Set the global TransactionType variable to UPDATE
    libCommon.setOnCreateUpdateFlag(context, 'UPDATE');

    return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSampleUpdateNav.action');
}