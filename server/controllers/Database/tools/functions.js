const classColors = {
    'Death Knight': '#c41e3b',
    'Demon Hunter': '#a330c9',
    'Druid': '#ff7c0a',
    'Hunter': '#aad372',
    'Mage': '#68ccef',
    'Monk': '#00ffba',
    'Paladin': '#f48cba',
    'Priest': '#f0ebe0',
    'Rogue': '#fff468',
    'Shaman': '#2359ff',
    'Warlock': '#9382c9',
    'Warrior': '#c69b6d'
}

module.exports = {
    //Function to remove Circular Object references
    getCircularReplacer: () => {
        const seen = new WeakSet();

        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    },

    qualityColor: (quality) => {
        switch (quality) {
            case 1:
                return '#ffffff'
            case 2:
                return '#02ff4e'
            case 3:
                return '#0281ff'
            case 4:
                return '#c600ff'
            case 5:
                return '#ff8002'
            case 6:
                return '#e5cc80'
            case 7:
                return '#0cf'
            default:
                return null
        }
    },

    qualityType: (quality) => {
        switch (quality) {
            case "COMMON":
                return '#ffffff'
            case "UNCOMMON":
                return '#02ff4e'
            case "RARE":
                return '#0281ff'
            case "EPIC":
                return '#c600ff'
            case "LEGENDARY":
                return '#ff8002'
            case "ARTIFACT":
                return '#e5cc80'
            case 7:
                return '#0cf'
            default:
                return null
        }
    },

    getClassColor: (x) => {
        return classColors[x]
    },
}