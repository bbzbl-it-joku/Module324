package ch.bbzbl.backend.config;

import io.quarkus.runtime.StartupEvent;
import io.vertx.core.http.HttpHeaders;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StaticResourceRoute {

    void installRoute(@Observes StartupEvent startupEvent, Router router) {
        // Add explicit static handler for all files
        router.route().order(9000).handler(StaticHandler.create().setWebRoot("META-INF/resources"));
        
        // Handle SPA routing - serve index.html for any non-API route that doesn't exist as static file
        router.route().order(10001).handler(routingContext -> {
            String path = routingContext.normalizedPath();
            
            // Let API routes pass through
            if (path.startsWith("/api/") || path.startsWith("/q/")) {
                routingContext.next();
                return;
            }
            
            // For SPA routes that aren't files, serve index.html
            if (!path.matches(".*\\.(js|css|html|svg|png|jpg|ico|woff|woff2|ttf)$")) {
                routingContext.response()
                    .putHeader(HttpHeaders.CONTENT_TYPE, "text/html")
                    .sendFile("META-INF/resources/index.html");
            } else {
                routingContext.next();
            }
        });
    }
}