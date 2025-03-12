import { EquipmentLibrary as EquipmentLib } from './EquipmentLibrary';
import {ValueIfExists} from '../Common/Library/Formatter';

/**
 * Rule used to display the various properties on the equipment list view row.
 * @see EquipmentLibrary
 */
export default function EquipmentListViewFormat(context) {
    var section = context.getName();
    var property = context.getProperty();
    var value = '';

    switch (section) {
        case 'ObjectListEquipmentViewSection':
        case 'EquipmentListViewSection':
            switch (property) {
                //Begin PG&E Replace
                /*
                case 'Subhead':
                    value = context.read('/SAPAssetManager/Services/AssetManager.service', `Plants('${context.binding.PlanningPlant}')`, [], '').then(function(result) {
                        let plant = '-';
                        if (result.length > 0 && (plant = result.getItem(0))) {
                            return ValueIfExists(context.binding.WorkCenter_Main_Nav, `${plant.PlantDescription} (${context.binding.PlanningPlant})`, function(workcenter) {
                                return `${plant.PlantDescription} (${context.binding.PlanningPlant}), ${workcenter.ExternalWorkCenterId}`;
                            });
                        } else {
                            return plant;
                        }
                    });
                    break;
                case 'SubstatusText':
                        //Display equipment status text.
                    value = EquipmentLib.getStatusDescription(context, false);
                    break;
                */
                case 'Title':
                    //Display equipment description
                    value = context.binding.EquipDesc;
                    break;
                case 'Subhead':
                    //Display equipment operating number and barcode
                    if (context.binding.ZzOperatingNum) {
                        value = context.binding.ZzOperatingNum;
                    } else {
                        value = '<' + context.localizeText('operating_num') + '>';
                    }
                    value = value + ' (';
                    if (context.binding.InventoryNum) {
                        value = value + context.binding.InventoryNum;
                    } else {
                        value = value + '<' + context.localizeText('barcode') + '>';
                    }
                    value = value + ')';
                    break;
                case 'Footnote':
                    //Display equipment ID
                    value = context.binding.EquipId;
                    break;
                case 'Description':
                    //Display address street
                    if (context.binding.Address.Street) {
                        value = context.binding.Address.Street;
                    } else {
                        value = '<' + context.localizeText('street_loc') + '>';
                    }
                    break;
                case 'StatusText':
                    //Display vault
                    if (context.binding.ZzVault) {
                        value = context.localizeText('vault') + ' ' + context.binding.ZzVault;
                    } else {
                        value = '<' + context.localizeText('vault') + '>';
                    }
                    break;
                case 'SubstatusText':
                    //Display feeder (circuit)
                    if (context.binding.ZzFeeder) {
                        value = context.binding.ZzFeeder;
                    } else {
                        value = '<' + context.localizeText('feeder') + '>';
                    }
                    break;
                //End PG&E Replace
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return value;
}
