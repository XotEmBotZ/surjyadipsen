import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { showAdminUI } from "../../../../../keystatic.config";

export const { POST, GET } = (() => {
  if (!showAdminUI) {
    const notFoundRouteHandler = () => {
      return new Response(null, {
        status: 404,
      });
    };
    return { GET: notFoundRouteHandler, POST: notFoundRouteHandler };
  }

  return makeRouteHandler({
    config,
  });
})();
