export default function ZzOilSampleWithdrawButtonVisible(context) {
    let binding = context.getPageProxy().binding;
    if (binding.Batch && !binding['@sap.isLocal']) {
        return true;
    }
    return false;
}