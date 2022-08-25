const axios = require('axios').default


module.exports = {



    index: (req, res) => {

        var apiKeyVisual = "RNMTQR4HN992YPFDY8EV6QGXM"

        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2022-08-11/2022-08-15?key=${apiKeyVisual} `).then((response) => {

            // console.log(response.data.days[0].tempmax)

            console.log(response.data)

            res.render('index', { response })

        }).catch((error => {
            console.log(error)
        }))

    },
    find: (req, res) => {

        var apiKeyVisual = "RNMTQR4HN992YPFDY8EV6QGXM"
        var apiKey = "52d1600eff760f37daaf81f7c3a10a55"
        var lat
        var lon

        let userSearch = req.body.userSearch

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}`).then((response) => {
            lat = response.data.coord["lat"]
            lon = response.data.coord["lon"]
            let todayDate = new Date()
            var date = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate()
            var endDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + (todayDate.getDate() + 4)

            axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${date}/${endDate}?key=${apiKeyVisual}`).then((data) => {


                // console.log(data.data)

                res.render('index', { foundCountry: data })
            })
        }).catch((error) => {
            notFound = {
                msg: "Sorry, no results. Please try again"
            }
            res.render('index', { notFound })
        })

    }








}