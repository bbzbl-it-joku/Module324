package ch.bbzbl.backend.controller;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/api/health")
public class HealthController {

     @GET
     public Response healthCheck() {
        return Response.ok().build();
     }

}
