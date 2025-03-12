import OilSamplesCount from '../ZzOilSamplesCountCompleteVsTotal.js';

export default function ZzOilSamplesListViewOnLoadListViewOnLoad(context) {
    return OilSamplesCount(context).then(count => {
        let params=[count];
        return context.localizeText('oil_samples_x', params);
    });
}