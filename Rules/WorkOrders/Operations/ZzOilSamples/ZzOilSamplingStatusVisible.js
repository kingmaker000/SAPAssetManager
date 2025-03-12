export default function ZzOilSamplingStatusVisible(context) {
    if (context.getPageProxy().binding.ZOilSamples[0]) {
        return true;
    }
    return false;
}