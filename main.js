window.addEventListener('load', () => {
    let long
    let lat

    let temperatureDegree = document.querySelector('.degree')
    let temperatureDescriotion = document.querySelector('.temperature-description')
    let locationTimezone = document.querySelector('.location-timezone')



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    let { temperature, summary, icon } = data.currently

                    //Set DOM elements from the API
                    temperatureDegree.addEventListener('click', () => {
                        if (document.querySelector('span').textContent == 'F') {
                            temperatureDegree.textContent = ((temperature - 32) * (5 / 9)).toFixed(1)
                            document.querySelector('span').textContent = 'C'
                        }
                        else {
                            temperatureDegree.textContent = temperature
                            document.querySelector('span').textContent = 'F'
                        }

                    })

                    temperatureDegree.textContent = ((temperature - 32) * (5 / 9)).toFixed(1);
                    temperatureDescriotion.textContent = summary

                    locationTimezone.textContent = data.timezone

                    //Set icons
                    setIcon(icon, document.querySelector('.icon'))
                })
        })
    } else {
        alert(`Sorry, but an app doesn't have an accept to your geolocation`)
    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "White" })
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
})