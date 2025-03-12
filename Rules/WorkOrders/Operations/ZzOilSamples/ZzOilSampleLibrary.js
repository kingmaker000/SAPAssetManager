import libCom from '../../../Common/Library/CommonLibrary';
import libVal from '../../../Common/Library/ValidationLibrary';
import libThis from './ZzOilSampleLibrary';
import OffsetODataDate from '../../../Common/Date/OffsetODataDate';

export default class {

    //*************************************************************
    // Oil Sample Update
    //*************************************************************

    /**
    * Set values for oil sample update service before writing OData record
    */
    static zzOilSampleUpdateSetODataValue(context, key, parameterName) {
        let binding = context.getPageProxy().binding;
        var date;
        var odataDate;

        switch (key) {
            /*
            case 'GMCode':
                return libCom.getAppParam(pageClientAPI, 'PART', 'GoodsIssue');
            case 'MovementType':
                return binding.MovementType;
            case 'MovementReason':
                return binding.MovementReason;
            */
            case 'Plant':
                return binding.Plant;
            case 'StorageLocation':
                return binding.StorageLocation;
            case 'MaterialNum':
                return binding.MaterialNum;
            case 'Batch':
                if (binding.Batch) {
                    return binding.Batch;
                }
                else {
                    return libCom.getListPickerValue(libCom.getTargetPathValue(context, '#Control:BatchNumberLstPkr/#Value')) || '';
                }
            case 'BatchWithdrawn':
                return binding.BatchWithdrawn;
            case 'SampleDate':
                //date = new Date(GetSampleDateTime(pageClientAPI));
                date = new Date(libCom.getControlProxy(context, 'SampleDatePicker').getValue());
                odataDate = new OffsetODataDate(context,date);
                //odataDate = new ODataDate(date);
                return odataDate.toDBDateString(context);
            case 'Reservation':
                return binding.Reservation;
            case 'ReservationItem':
                return binding.ReservationItem;
            case 'BatchReadLink':
                let batchPkr = libCom.getListPickerValue(libCom.getTargetPathValue(context, '#Control:BatchNumberLstPkr/#Value')) || '';
                var batch = batchPkr;
                if (!batch) {
                    batch = binding.Batch;
                }
                return `MaterialBatches(MaterialNum='${binding.MaterialNum}',Batch='${batch}',Plant='${binding.Plant}')`;
            case 'BatchWithdrawnReadLink':
                return `MaterialBatches(MaterialNum='${binding.MaterialNum}',Batch='${binding.BatchWithdrawn}',Plant='${binding.Plant}')`;
            case 'MaterialDocumentNum':
                return binding.MaterialDocumentNum;
            case 'MaterialDocumentYear':
                return binding.MaterialDocumentYear;
            case 'MaterialDocumentItem':
                return binding.MaterialDocumentItem;
            default:
                return '';
        }
    }
    
}