import { Application } from "./app";
import { database } from "./database/config";

const app = new Application();

database
	.initialize()
	.then(() => {
		app.listen();
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
