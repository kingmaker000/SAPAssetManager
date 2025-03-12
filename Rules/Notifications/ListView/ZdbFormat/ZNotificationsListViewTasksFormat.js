import OffsetODataDate from '../../../Common/Date/OffsetODataDate';
import libMobile from '../../../MobileStatus/MobileStatusLibrary';
import common from '../../../Common/Library/CommonLibrary';
/*&========================================================================== *
*&       P A C I F I C  G A S  &  E L E C T R I C  C O M P A N Y             *
*&===========================================================================*
*& Author         : R6CM(Ravi Challa)                                        *
*& Date Started:  : 07/19/2023                                               *
*& Program Name  :  ZNotificationsListViewTasksFormat.js                     *                                                     *
*& Description   :                                                           *
*& This file is used to format subhead, Tiltle, substatustext, footnote      *
*& on supervisor dash board overview screen and Task list view               *                                                                          *
*&===========================================================================*
*&---------------------------------------------------------------------------*
               P R O G R A M  C H A N G E  H I S T O R Y 
 *&---------------------------------------------------------------------------*/

export default function NotificationsListViewTasksFormat(context) { 
    var binding = context.binding;
    var value = "";
    var value_display = '';
    var value_status = '';
    var property = context.getProperty();
    switch (property) {
        case 'Subhead':
            if (binding.Tasks.length > 1) {
               for (var i = 0; i < binding.Tasks.length; i++)
               {
                 // concatenate both SUPA and NPSA task if both not complete, else show only not incomplete ones;  
                 // if task status is complete do not show in the concatenate string             
                 if (binding.Tasks[i].TaskMobileStatus_Nav.MobileStatus != 'COMPLETED' && (binding.Tasks[i].TaskCode === 'SUPA' || binding.Tasks[i].TaskCode === 'NPSA'))  {
                    value += binding.Tasks[i].TaskCode + ' ';
                   }
                 }
                 value = `${binding.NotificationNumber}-${binding.NotificationType}-${value}`;
                 break;
            }else {
                value = `${binding.NotificationNumber}-${binding.NotificationType}-${binding.Tasks[0].TaskCode}`;
                break;
            }                   
            
        case 'Title':     
               value = `${binding.NotificationDescription}`;
            break;   

        case 'StatusText':
                var priority = binding.NotifPriority;
                value = common.isDefined(priority) ? priority.PriorityDescription : context.localizeText('none');
                break;
        case 'SubstatusText':
               value_status = `${binding.NotifMobileStatus_Nav.MobileStatus}`;
               value = context.localizeText(value_status);
                break; 
        case 'Footnote':
            if (binding.RequiredEndDate) {
                let odataDate = OffsetODataDate(context, binding.RequiredEndDate);
                value = context.formatDate(odataDate.date());
                break;
            } else {
                value = context.localizeText('no_due_date');
                break;
            }
        case 'SubstatusText':
            mobileStatus = libMobile.getMobileStatus(context.binding, context);
            if (mobileStatus) {
                value = context.localizeText(mobileStatus);
            } else if (binding.NotifMobileStatus_Nav.OverallStatusCfg_Nav) {
                value = binding.NotifMobileStatus_Nav.OverallStatusCfg_Nav.OverallStatusLabel;
            }
            break;
        default:
            break;
    }
    return value;
}
