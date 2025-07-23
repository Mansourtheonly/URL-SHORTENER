import 'dotenv/config';
import Koa from 'koa';
import { onDatabaseConnect } from './config/knex';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';  
import router from './routes/index'; // Import your routes


const app = new Koa();

app.use(cors()); // Enable CORS
app.use(helmet()); // Use Helmet for security
app.use(bodyParser()); // Use body parser middleware


app.use(router.routes()).use(router.allowedMethods()); // Register routes



const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('Connected to the database successfully!');

    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );

  } catch (e) {
    console.error('Error starting the server:', e);
  }
};

// ✅ Start the app
main();
