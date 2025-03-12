import inspCharLib from './InspectionCharacteristics';
import quantitativeValue from './InspectionCharacteristicsQuantitativeValue';

export default function InspectionCharacteristicsValuation(context) {
    if (inspCharLib.isQualitative(context.binding)) {
        return context.binding.Valuation;
    }

    let value = quantitativeValue(context);
    let valueAccepted = false;
    if ((inspCharLib.isQuantitative(context.binding) || inspCharLib.isCalculatedAndQuantitative(context.binding)) && (context.binding.TargetValue === value )) {
        valueAccepted = true;
    } else {
        valueAccepted = true;
        if (context.binding.LowerLimitFlag === 'X' && value < context.binding.LowerLimit) {
            valueAccepted = false;
        }
        if (context.binding.UpperLimitFlag === 'X' && value > context.binding.UpperLimit) {
            valueAccepted = false;
        }
    }

    if (valueAccepted) {
        return 'A';
    }

    return 'R';

}
