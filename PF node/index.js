import express from "express";
const app = express();
import { hotelServices } from "./services/hotel-services.js";

const port = 3000;

app.use(express.json())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})


app.get('/tarea', async (req, res) => {
    const tarea = await hotelServices.getALL()
    res.status(200).send(tarea)

})

app.get('/tarea/:id', async (req, res) => {
    const tarea = await hotelServices.getById(req.params.idTarea)
    res.status(200).send(tarea)

})

app.get('/tarea', async (req, res) => {
    const tarea = await hotelServices.getALL()
    res.status(200).send(tarea)

})

app.post('/tarea', async (req, res) => {
    console.log("en post, req:", req)
    try {
        await hotelServices.insert(req.body)
        res.status(200).json({ message: 'tarea creada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fallo el insert' });
    }
})

app.put('/tarea/:id', async (req, res) => {
    try {
        await hotelServices.update(req.params.idTarea, req.body);
        res.status(200).json({ message: 'tarea Actualizada'});
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Fallo el update' });

    }
})

app.delete('/tarea/:id', async (req, res) => {
    try {
        await hotelServices.deleteById(req.params.idTarea);
        res.status(200).json({ message: 'tarea Eliminada'});
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Fallo el delete' });

    }
})