
import { configure, renderFile } from "../deps.js";

const renderMiddleware = async (context, next) => {
    configure({
        views: `${Deno.cwd()}/views/`,
    });

    context.render = async (view, data) => {
        const content = await renderFile(view, data);
        context.response.headers.set("Content-Type", "text/html; charset=utf-8");
        context.response.body = await renderFile("layouts/layout.eta", { content });
    };

    await next();
};

export { renderMiddleware };
