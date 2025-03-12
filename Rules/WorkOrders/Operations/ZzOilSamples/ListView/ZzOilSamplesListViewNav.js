export default function ZzOilSamplesListViewNav(context) {
    context.getPageProxy().setActionBinding(context.binding);
    return context.executeAction('/SAPAssetManager/Actions/WorkOrders/Operations/ZzOilSamples/ZzOilSamplesListViewNav.action');
}