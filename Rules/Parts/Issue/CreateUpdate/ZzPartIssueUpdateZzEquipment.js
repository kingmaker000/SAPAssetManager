export default function ZzPartIssueUpdateZzEquipment(context) {
    if (context.binding.RelatedItem) {
        return context.binding.RelatedItem[0].ZzEquipment; 
    } else {
        return context.binding.EquipID;
    }
}