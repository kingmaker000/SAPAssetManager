export default function NotificationCreateUpdateHierarchyListPickerOnLoaded(control) {
    let name = control.getName();
    let context = control.getPageProxy();

    return setDefaultListPickerValue(context, name);
}

function setDefaultListPickerValue(context, name) {
    let formCellContainer = context.getControl('FormCellContainer');
    var extension;
    var value;

    if (name === 'FuncLocHierarchyExtensionControl') {
        value = formCellContainer.getControl('FuncLocHierarchyExtensionControl').getValue();
        if (!value) {
            ///////////////////////////////////////////////////////////////////////////////
            // Begin PG&E Enhancement (D0RB)
            // Commented line that dumps because FuncLoc_Nav is null.  Replaced with code
            //   to use the inspection lot's work order header equipment, because there is
            //   only ever one inspection point per lot per work order for PG&E Networks.
            //
            //value = context.binding.InspectionPoint_Nav.FuncLoc_Nav.FuncLocIdIntern;
            value = context.binding.InspectionLot_Nav.WOHeader_Nav.HeaderFunctionLocation;
            // End PG&E Enhancement (D0RB)
            ///////////////////////////////////////////////////////////////////////////////
        }
        if (value) {
            extension = formCellContainer.getControl('FuncLocHierarchyExtensionControl')._control._extension;
        }
    } else {
        value = formCellContainer.getControl('EquipHierarchyExtensionControl').getValue();
        if (!value) {
            value = context.binding.InspectionPoint_Nav.Equip_Nav.EquipId;
        }
        if (value) {
            extension = formCellContainer.getControl('EquipHierarchyExtensionControl')._control._extension;
        }
    }
    if (extension) {
        extension.setData(value);
    }
}
