module.exports = {

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

            default:
                return null
        }
    },

}