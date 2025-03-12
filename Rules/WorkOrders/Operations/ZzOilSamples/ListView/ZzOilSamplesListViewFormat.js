import libVal from '../../../../Common/Library/ValidationLibrary';
import OffsetODataDate from '../../../../Common/Date/OffsetODataDate';

export default function ZzOilSamplesListViewFormat(context) {

    let binding = context.binding;
    let property = context.getProperty();
    var value = "";

    switch (property) {
        case 'Title':
            //Display equipment description
            value = binding.Equipment.EquipDesc;
            break;
        case 'Subhead':
            //Display equipment operating number and equipment type
            if (binding.Equipment.ZzOperatingNum) {
                value = binding.Equipment.ZzOperatingNum;
            } else {
                value = '<' + context.localizeText('operating_num') + '>';
            }
            value = value + ' (';
            if (binding.Equipment.EquipType) {
                value = value + binding.Equipment.EquipType;
            } else {
                value = value + '<' + context.localizeText('equipment_type') + '>';
            }
            value = value + ')';
            break;
        case 'Footnote':
            //Display equipment number and barcode
            value = binding.Equipment.EquipId;
            value = value + ' (';
            if (binding.Equipment.InventoryNum) {
                value = value + binding.Equipment.InventoryNum;
            } else {
                value = value + '<' + context.localizeText('barcode') + '>';
            }
            value = value + ')';
            break;
        case 'Description':
            //Display material description
            value = binding.Material.Description;
            break;
        case 'StatusText':
            //Display batch number
            if (binding.Batch) {
                value = binding.Batch;
            } else if (binding.BatchWithdrawn) {
                value = binding.BatchWithdrawn;
            }
            break;
        case 'SubstatusText':
            //Display sample date
            if (binding.Batch && !libVal.evalIsEmpty(binding.SampleDate)) {
                let odataDate = new OffsetODataDate(context,binding.SampleDate);
                value = context.formatDate(odataDate.date());
            } else if (binding.BatchWithdrawn) {
                value = 'Withdrawn';
            }
            break;
        default:
            break;
    }

    return value;

}