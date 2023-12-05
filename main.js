import express from 'express';
import config from 'config';
import { engine } from 'express-handlebars';

// Settings
const PORT = 3000;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

// Router
app.get('/', (_, res) => {
    res.render('index');
});

app.post('/', ({ body }, res) => {
    const prompt = body.prompt;
    const size = body.size;
    const number = body.number ?? 1;

    try {
        // request to openAI
    } catch (e) {
        console.log(`ERROR: ${e}`);
    }

    console.log(`{ prompt: ${prompt}, size: ${size}, number: ${number} }`); // log

    res.render('index');
});

// App start
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
