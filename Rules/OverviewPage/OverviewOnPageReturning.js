import OnDateChanged from '../Common/OnDateChanged';
/*&========================================================================== *
 *&       P A C I F I C  G A S  &  E L E C T R I C  C O M P A N Y             *
 *&===========================================================================*
 *& Author         : R6CM(Ravi Challa)                                        *
 *& Date Started:  : 07/19/2023                                               *
 *& Program Name  :  OverviewOnPageReturning                                  *                                                     
 *& Description   :                                                           *
 *& This file is used to refresh notification count on overview page          *
 *& commented out mapViewExtension.update() as it is terminating the method   *
 *&===========================================================================*
 *&---------------------------------------------------------------------------*
               P R O G R A M  C H A N G E  H I S T O R Y 
 *&---------------------------------------------------------------------------*/
export default function OverviewOnPageReturning(context) {
    // Insert context.redraw() R6CM to refresh overview page 
     context.redraw();
    // Refresh the map view
    let sectionedTable = context.getControls()[0]; 
    //let mapSection = sectionedTable.getSections()[0]; Commented out R6CM
    //let mapViewExtension = mapSection.getExtensions()[0]; Commented out R6CM
    //mapViewExtension.update(); Commented out R6CM

    // Check to see if this date has changed
    let lastDateChange = context.getClientData().lastDateChange;
    let now = new Date();

    if (lastDateChange.getDate() !== now.getDate() && now > lastDateChange) {
        OnDateChanged(context);
    }

}
