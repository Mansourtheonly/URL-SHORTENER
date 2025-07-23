import Router from '@koa/router';
import authRouter from './auth'; // 👈 Add this import
import urlsRouter from './urls'; // 👈 Ensure this import is correct
const router = new Router();

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());

// You must define proper routers for /urls and /visits or remove these lines if not implemented
    
router.use("/urls",
     urlsRouter.routes(),
      urlsRouter.allowedMethods()
    );

// router.use("/visits", visitsRouter.routes(), visitsRouter.allowedMethods());

export default router;
