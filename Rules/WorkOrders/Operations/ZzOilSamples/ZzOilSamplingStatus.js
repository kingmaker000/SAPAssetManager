import OilSamplesCount from './ZzOilSamplesCount';

export default function ZzOilSamplingStatus(context) {
    return OilSamplesCount(context, 'COMPLETE').then(complete => {
        if (complete === 0) {
            return context.localizeText('not_started');
        }
        else {
            return OilSamplesCount(context, 'TOTAL').then(total => {
                if (complete === total) {
                    return context.localizeText('complete');
                }
                return context.localizeText('incomplete');;
            })
        }
    })
}