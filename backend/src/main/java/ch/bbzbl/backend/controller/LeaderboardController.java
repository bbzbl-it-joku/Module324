package ch.bbzbl.backend.controller;

import ch.bbzbl.backend.dto.LeaderboardDTO;
import ch.bbzbl.backend.service.LeaderboardService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/leaderboard")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LeaderboardController {

    @Inject
    LeaderboardService leaderboardService;

    @GET
    @Path("/top10")
    public Response getTop10() {
        List<LeaderboardDTO> top10 = leaderboardService.getTop10();
        return Response.ok(top10).build();
    }

    @GET
    public Response getAll() {
        List<LeaderboardDTO> all = leaderboardService.getAll();
        return Response.ok(all).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        LeaderboardDTO dto = leaderboardService.getById(id);
        if (dto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(dto).build();
    }

    @POST
    public Response create(LeaderboardDTO dto) {
        LeaderboardDTO created = leaderboardService.create(dto);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Integer id, LeaderboardDTO dto) {
        LeaderboardDTO updated = leaderboardService.update(id, dto);
        if (updated == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {
        boolean deleted = leaderboardService.delete(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}
