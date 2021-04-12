import Vue from 'vue'

Vue.filter('threeDigitsCoversion', function (value) {
    const twoDecimals = +(Math.round(value + "e+2") + "e-2")
    return twoDecimals.toLocaleString();
})

Vue.filter('stringLengthShorten', function (value) {
    if (value == null) {
        return " ------- "
    }

    if (value.length > 30) {
        let trimmedString = value.slice(0, 30)
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

        return trimmedString + " ....."
    }

    return value
})

Vue.filter('changeDateFormat', function (value) {
    // const date = this.$store.state.users[this.selectedUser].dateOfBirth;
    const year = new Date(value).getFullYear();
    const month = ("0" + (new Date(value).getMonth() + 1)).slice(-2);
    const day = ("0" + new Date(value).getDate()).slice(-2);

    return day + "-" + month + "-" + year
})