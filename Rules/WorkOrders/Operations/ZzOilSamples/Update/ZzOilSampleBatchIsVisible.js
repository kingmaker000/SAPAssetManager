export default function ZzOilSampleBatchIsVisible(context) {
    if (context.binding.Batch) {
        return true;
    }
    return false;
}