import app from './app';
import { PORT } from './common/config';

app.listen(Number(PORT), (err) => {
    app.log.error(err)
    console.log(`App is running on http://localhost:${PORT}`)
  }
);
