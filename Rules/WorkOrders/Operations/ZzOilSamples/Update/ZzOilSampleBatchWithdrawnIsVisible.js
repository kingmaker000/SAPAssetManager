export default function ZzOilSampleBatchWithdrawnIsVisible(context) {
    if (context.binding.BatchWithdrawn) {
        return true;
    }
    return false;
}