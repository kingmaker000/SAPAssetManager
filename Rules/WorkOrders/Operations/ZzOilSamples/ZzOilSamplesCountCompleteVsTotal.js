import OilSamplesCount from './ZzOilSamplesCount';

export default function ZzOilSamplesCountCompleteVsTotal(context) {
    return OilSamplesCount(context, 'COMPLETE').then(complete => {
        return OilSamplesCount(context, 'TOTAL').then(total => {
            return complete + '/' + total;
        })
    })
}