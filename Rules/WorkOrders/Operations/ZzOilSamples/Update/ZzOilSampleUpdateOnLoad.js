import libCom from '../../../../Common/Library/CommonLibrary';
import ODataDate from '../../../../Common/Date/ODataDate';
import OffsetODataDate from '../../../../Common/Date/OffsetODataDate';

export default function ZzOilSampleUpdateOnLoad(context) {
    const formCellContainerProxy = context.getControl('FormCellContainer');
    const binding = context.binding;
    let sampleDateTime;
    let syncDateTime;

    //Set Sample Date
    if (libCom.isDefined(binding.SampleDate)) {
        sampleDateTime = new OffsetODataDate(context, binding.SampleDate);
    } else {
        sampleDateTime = new ODataDate();
    }

    let sampleDateControl = formCellContainerProxy.getControl('SampleDatePicker');
    sampleDateControl.setValue(sampleDateTime.date());

    //Set Sync Date and Time
    if (libCom.isDefined(binding.SyncDate) && libCom.isDefined(binding.SyncTime)) {
        syncDateTime = new OffsetODataDate(context, binding.SyncDate, binding.SyncTime);
    }

    let syncDateTimeControl = formCellContainerProxy.getControl('SyncDateTimePicker');
    syncDateTimeControl.setValue(syncDateTime.date());

}