const axios = require('axios').default


module.exports = {



    index: (req, res) => {

        var apiKey = "52d1600eff760f37daaf81f7c3a10a55"

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=metric`).then((response) => {
            res.render('index', { response })
        })
            .catch((error => {
                console.log(error)
            }))
        //  lat={lat}&lon={lon}
    },
    find: (req, res) => {

        var apiKey = "52d1600eff760f37daaf81f7c3a10a55"
        var lat
        var lon



        let userSearch = req.body.userSearch

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}`).then((response) => {
            lat = response.data.coord["lat"]
            lon = response.data.coord["lon"]
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en&lang=en`).then((data) => {
                console.log(data)
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