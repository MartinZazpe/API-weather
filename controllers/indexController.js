const axios = require('axios').default


module.exports = {



    index: (req, res) => {

        var apiKeyVisual = "RNMTQR4HN992YPFDY8EV6QGXM"
        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2022-08-11/2022-08-15?key=${apiKeyVisual} `).then((response) => {

            console.log(response.data)

            res.render('index', { response })


        }).catch((error => {
            console.log(error)
            res.render('index', { error })
        }))

    },
    find: (req, res) => {

        var apiKeyVisual = "RNMTQR4HN992YPFDY8EV6QGXM"
        var apiKey = "52d1600eff760f37daaf81f7c3a10a55"
        var lat
        var lon

        let userSearch = req.body.userSearch

        //get coordinates from user
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}`).then((response) => {
            lat = response.data.coord["lat"]
            lon = response.data.coord["lon"]
            let todayDate = new Date()
            var date = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate()
            var endDate = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + (todayDate.getDate() + 4)

            //return search of coordinates
            axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${date}/${endDate}?key=${apiKeyVisual}`).then((data) => {


                res.render('index', { foundCountry: data })

                // if (data) {
                //     res.render('index', { foundCountry: data })
                // } else if (data == 'You have exceeded the maximum number of daily result records for your account. Please add a credit card to continue retrieving results.') {
                //     res.render('index')
                // }
            })
        }).catch((error) => {

            if (error.response.data.message == 'city not found') {
                notFound = {
                    msg: "Sorry, no results. Please try again"
                }
                res.render('index', { notFound })
            } else {
                console.log(error)
                res.render('index', { error })
            }

        })

    }








}