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
}