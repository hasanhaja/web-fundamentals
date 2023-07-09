import { Application, Router } from "oak";

const router = new Router();

router
  .get("/", async (context) => {
      const { search } = context.request.url;

      if (!search) {
        await context.send({
          root: `${Deno.cwd()}/static`,
          index: "index.html",
        });
        return;
      }

      const params = new URLSearchParams(search);
      const name = params.get("name");
      context.response.body = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Form</title>
  </head>
  <body>
    <h1>Our form</h1>
    <p>Hi there, ${name}!</p>
  </body>
</html>
      `;

  })
  .post("/", async (context) => {
    const formBody = await context.request.body({ type: "form" }).value;
    const name = formBody.get("name");

    context.response.body = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title>Form</title>
	</head>
	<body>
		<h1>Our form</h1>
    <p>Hi there, ${name}!</p>
	</body>
</html>
    `;
  })
;

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
