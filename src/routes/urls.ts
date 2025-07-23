import Router from '@koa/router';
import { getURLS } from '../services/urls'

const urlsRouter = new Router();

urlsRouter.get('/', async (ctx) => {
    ctx.response.body = getURLS(ctx.state.user_id ,
         Number(ctx.request.query.limit) ,
          Number(ctx.request.query.offset));

});

export default urlsRouter;