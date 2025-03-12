import common from '../Common/Library/CommonLibrary';

export default function CodeLstPkr(context) {
    try	{
        var tmp = common.getTargetPathValue(context, '#Control:CodeLstPkr/#SelectedValue');
        var selectedCode = tmp ? String(tmp) : '';
        return selectedCode;
    } catch (exception)	{
        return undefined;
    }
}
