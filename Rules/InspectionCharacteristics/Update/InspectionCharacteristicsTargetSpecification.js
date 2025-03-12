import inspCharLib from './InspectionCharacteristics';

export default function InspectionCharacteristicsTargetSpecification(context) {
    let binding = context.binding;
    if (inspCharLib.isQuantitative(binding) || inspCharLib.isCalculatedAndQuantitative(binding)) {
        let uom = binding.MasterInspChar_Nav.UoM;
        let lowerLimit = binding.LowerLimitFlag === 'X' ? binding.LowerLimit : '-∞';
        let upperLimit = binding.UpperLimitFlag === 'X' ? binding.UpperLimit : '∞';
        if (binding.TargetValueFlag === 'X')
            return `${lowerLimit} ${uom} - ${upperLimit} ${uom} (${context.localizeText('target_value')} ${binding.TargetValue})`;
        else
            return `${lowerLimit} ${uom} - ${upperLimit} ${uom}`;
    }
    return '-';
}
