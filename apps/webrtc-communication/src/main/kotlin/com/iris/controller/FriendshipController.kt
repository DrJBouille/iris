package com.iris.controller

import com.iris.service.FriendshipService
import com.iris.service.UserService
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.Response

@Path("/api/friendships")
@ApplicationScoped
class FriendshipController {
    @Inject
    private lateinit var friendshipService: FriendshipService

    @Inject
    private lateinit var userService: UserService

    @GET
    fun getFriends(): Response {
        val user = userService.getByJWTSubject() ?: return Response.status(Response.Status.FORBIDDEN).entity("User not connected").build()
        return Response.ok(friendshipService.getFriends(user.id!!)).build()
    }
}