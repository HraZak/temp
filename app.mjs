import express from 'express'
import { createReport } from 'docx-templates';
import fs from 'fs';



const app = express()
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())
const port = 3000
const povereniTemplate = fs.readFileSync('povereni.docx');



app.post('/povereni', (req, res) => {
    createReport({
        'template': povereniTemplate,
        'data': {
            'spisovaZn': req.body.spisovaZn ?? '',
            'datum': req.body.datum ?? '',
            'povereniKeKontrole': req.body.povereniKeKontrole ?? '',
            'ustanoveni': req.body.ustanoveni ?? '',
            'vedouci': req.body.vedouci ?? '',
            'clen': req.body.clen ?? '',
            'kontrolovanaOsoba': req.body.kontrolovanaOsoba ?? '',
            'predmetKontroly': req.body.predmetKontroly ?? '',
            'kontrolovaneObdobi': req.body.kontrolovaneObdobi ?? ''
        }
    }).then(e => {
        res.attachment('test.docx')
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