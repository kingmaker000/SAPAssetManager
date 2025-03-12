import OilSamplesCount from './ZzOilSamplesCount';

export default function ZzOilSamplesCountStyle(context) {
    return OilSamplesCount(context, 'COMPLETE').then(complete => {
        if (complete === 0) {
            return 'ObjectCellStyleRed';
        }
        else {
            return OilSamplesCount(context, 'TOTAL').then(total => {
                if (complete === total) {
                    return 'ZzObjectCellStyleGreen';
                }
                return 'ObjectCellStyleRed';
            })
        }
    })
}