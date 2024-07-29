import server from "./server";
import colors from 'colors';

const port = 4000;

server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API on port ${process.env.PORT}`));
});