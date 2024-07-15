export default function checkAvailableId(sentences) {
    const copyArray = [...sentences];
    const usedIds = copyArray.map(item => item.id);

    // while sprawdza czy liczba zawiera samą siebie,
    // jeśli tak to dodaje +1 i idzie petla dalej
    // jesli nie to konczy prace a nextAvailableId
    // zawiera ID
    let nextAvailableId = 1;
    while (usedIds.includes(nextAvailableId)) {
        nextAvailableId++;
    }

    return nextAvailableId;
}
