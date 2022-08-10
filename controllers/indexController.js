const axios = require('axios').default


module.exports = {



    index: (req, res) => {

        axios.get('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=52d1600eff760f37daaf81f7c3a10a55&units=metric').then((response) => {
            console.log(response)
            res.render('index', { response })
        })



            .catch((error => {
                console.log(error)
            }))


        //  lat={lat}&lon={lon}

    }








}