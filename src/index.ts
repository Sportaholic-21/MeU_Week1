import server from "./server";
;
const port = 3000 || process.env.PORT;

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

