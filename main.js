import express from 'express';
import config from 'config';
import { engine } from 'express-handlebars';
import OpenAI from 'openai';

// Settings
const PORT = 3030;

const openai = new OpenAI({
    apiKey: config.get('OPENAI_KEY-2'),
  });

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

// Router
app.get('/', (_, res) => {
    res.render('index');
});

app.post('/', async ({ body }, res) => {
    const prompt = body.prompt;
    const size = body.size ?? '512x512';
    const number = body.number ?? 1;

    try {
        const response = await openai.images.generate({
            prompt,
            size,
            n: Number(number),
        });

        res.render('index', {
            images: response.data,
        });

        // console.log(response.data); // img url

    } catch (e) {
        console.log(`ERROR: ${e.message}`);
    }

    console.log(`{ prompt: ${prompt}, size: ${size}, number: ${number} }`); // log

});

// App start
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
