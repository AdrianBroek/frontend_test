export default function checkAvailableId(sentences) {
    const copyArray = [...sentences];
    const usedIds = copyArray.map(item => item.id);
    // zawiera ID
    let nextAvailableId = 1;
    while (usedIds.includes(nextAvailableId)) {
        nextAvailableId++;
    }

    return nextAvailableId;
}
