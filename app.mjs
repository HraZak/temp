import express from 'express'
import { createReport } from 'docx-templates';
import fs from 'fs';



const app = express()
// app.use(express.json())
// app.use(express.raw())
// app.use(express.urlencoded({ extended: true }))
app.use(express.text())
const port = 3000
const povereniTemplate = fs.readFileSync('povereni.docx');



app.post('/povereni', (req, res) => {
    const data = JSON.parse(req.body)

    createReport({
        'template': povereniTemplate,
        'data': {
            'spisovaZn': data.spisovaZn ?? '',
            'datum': data.datum ?? '',
            'povereniKeKontrole': data.povereniKeKontrole ?? '',
            'ustanoveni': data.ustanoveni ?? '',
            'vedouci': data.vedouci ?? '',
            'clen': data.clen ?? '',
            'kontrolovanaOsoba': data.kontrolovanaOsoba ?? '',
            'predmetKontroly': data.predmetKontroly ?? '',
            'kontrolovaneObdobi': data.kontrolovaneObdobi ?? ''
        }
    }).then(e => {
        res.attachment('povereni.docx')
            .end(e)
    })
})



app.all('/test', function (req, res, next) {
    console.log(req)
    console.log(res)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})