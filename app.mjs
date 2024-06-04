import express from 'express'
import { createReport } from 'docx-templates';
import fs from 'fs';



const app = express()
app.use(express.urlencoded({ extended: true }))
const port = 3000
const povereniTemplate = fs.readFileSync('povereni.docx');



app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/test', function (req, res, next) {
    console.log(req.body)
    res.json(req.body)
})
app.post('/povereni', (req, res) => {
    const spisovaZn = req.body.spisovaZn ?? ""
    const datum = req.body.datum ?? ""
    const povereniKeKontrole = req.body.povereniKeKontrole ?? ""
    const ustanoveni = req.body.ustanoveni ?? ""
    const vedouci = req.body.vedouci ?? ""
    const clen = req.body.clen ?? ""
    const kontrolovanaOsoba = req.body.kontrolovanaOsoba ?? ""
    const predmetKontroly = req.body.predmetKontroly ?? ""
    const kontrolovaneObdobi = req.body.kontrolovaneObdobi ?? ""

    createReport({
        "template": povereniTemplate,
        "body": req.body,
    }).then(e => {
        res.attachment('test.docx')
            .end(e)
    })
})
app.get('/povereni', (req, res) => {
    createReport({
        template,
        "body": {
            "spisovaZn": 'KUKHK-52/654/2023',
            "datum": "23.9.2023",
            "povereniKeKontrole": "č.564/2023",
            "ustanoveni": "§ 6 odst. 1 zákona č. 298/2014 Sb.",
            "vedouci": "Lubomír Voral, ev. č. 4659 - vedoucí kontrolní skupiny",
            "clen": "Zdeněk Týn, ev. č. 899 - člen kontrolní skupiny",
            "kontrolovanaOsoba": "Miloš Frontman, U Starosty 456, Domanín",
            "predmetKontroly": "kotel podle zákona § 1 odst. 5 zákona č. 892/2013 Sb.",
            "kontrolovaneObdobi": "1.1.2012 až 30.12.2015"
        },
    }).then(e => {
        res.attachment('test.docx')
            .end(e)
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})