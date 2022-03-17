import server from "./server";
import { db } from './config/database';

const port = 3000 || process.env.PORT;

db.connect(function (err: any) {
    if (err) throw err;
    console.log("Connected!");
  });

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

