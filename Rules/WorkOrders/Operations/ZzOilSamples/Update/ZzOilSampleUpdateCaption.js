export default function ZzOilSampleUpdateCaption(context) {

    if (context.binding.Batch) {
        return context.localizeText('review_sample');
    }
    return context.localizeText('take_sample');
}