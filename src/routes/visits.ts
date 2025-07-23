import Router from "@koa/router


const visitsRouter = new Router();

visitsRouter.get("/", async (ctx) => {
    ctx.response.body = await getVisits(
        ctx.state.user_id,
        Number(ctx.request.query.limit),
        Number(ctx.request.query.offset)
    );
})
.get("/:id", async (ctx) => {
ctx.response.body = await getVisitsByURL(
    ctx.params.id ,
     ctx.state.user_id
    Number(ctx.query.limit),
    Number(ctx.query.offset)
    );
});

export default visistsRouter;