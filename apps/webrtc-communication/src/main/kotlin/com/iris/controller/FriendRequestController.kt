package com.iris.controller

import com.iris.model.friend_request.FriendRequestDTO
import com.iris.model.friend_request.Status
import com.iris.service.FriendRequestService
import com.iris.service.FriendshipService
import com.iris.service.UserService
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.PUT
import jakarta.ws.rs.Path
import jakarta.ws.rs.PathParam
import jakarta.ws.rs.core.Response
import java.util.UUID

@Path("/api/friend-requests")
@ApplicationScoped
class FriendRequestController {
    @Inject
    private lateinit var friendRequestService: FriendRequestService

    @Inject
    private lateinit var friendShipService: FriendshipService

    @Inject
    private lateinit var userService: UserService

    @POST
    fun createFriendRequest(friendRequestDTO: FriendRequestDTO): Response {
        val receiver = userService.getByUsername(friendRequestDTO.username) ?: return Response.status(Response.Status.NOT_FOUND).entity("User not found").build()

        val friendRequest = friendRequestService.sendFriendRequest(receiver) ?: return Response.status(Response.Status.NOT_FOUND).entity("User does not exist").build()

        return Response.ok().entity(friendRequest).build()
    }

    @PUT
    @Path("/accept/{id}")
    fun acceptFriendRequest(@PathParam("id") id: UUID): Response {
        val user = userService.getByJWTSubject() ?: return Response.status(Response.Status.FORBIDDEN).entity("User not connected").build()
        val friendRequest = friendRequestService.getFriendRequest(id) ?: return Response.status(Response.Status.NOT_FOUND).entity("Friend request not found").build()

        if (user.id != friendRequest.sender.id) return Response.status(Response.Status.FORBIDDEN).entity("You are not the receiver of this request").build()

        val newFriendRequest = friendRequestService.changeFriendRequestStatus(Status.APPROVED, friendRequest)
        friendShipService.createFriendship(newFriendRequest.sender, newFriendRequest.receiver)

        return Response.ok().entity(newFriendRequest).build()
    }

    @PUT
    @Path("/reject/{id}")
    fun rejectFriendRequest(@PathParam("id") id: UUID): Response {
        val user = userService.getByJWTSubject() ?: return Response.status(Response.Status.FORBIDDEN).entity("User not connected").build()
        val friendRequest = friendRequestService.getFriendRequest(id) ?: return Response.status(Response.Status.NOT_FOUND).entity("Friend request not found").build()

        if (user.id != friendRequest.sender.id) return Response.status(Response.Status.FORBIDDEN).entity("You are not the receiver of this request").build()

        val newFriendRequest = friendRequestService.changeFriendRequestStatus(Status.REJECTED, friendRequest)

        return Response.ok().entity(newFriendRequest).build()
    }

    @PUT
    @Path("/cancel/{id}")
    fun cancelFriendRequest(@PathParam("id") id: UUID): Response {
        val user = userService.getByJWTSubject() ?: return Response.status(Response.Status.FORBIDDEN).entity("User not connected").build()
        val friendRequest = friendRequestService.getFriendRequest(id) ?: return Response.status(Response.Status.NOT_FOUND).entity("Friend request not found").build()

        if (user.id != friendRequest.sender.id) return Response.status(Response.Status.FORBIDDEN).entity("You are not the sender of this request").build()

        val newFriendRequest = friendRequestService.changeFriendRequestStatus(Status.CANCELLED, friendRequest)

        return Response.ok().entity(newFriendRequest).build()
    }

    @GET
    @Path("/received")
    fun getReceivedFriendRequests(): Response {
        val user = userService.getByJWTSubject() ?: return Response.status(Response.Status.FORBIDDEN).entity("User not connected").build()
        return Response.ok().entity(friendRequestService.getReceivedFriendRequests(user.id!!)).build()
    }

    @GET
    @Path("/send")
    fun getSendFriendRequests(): Response {
        val user = userService.getByJWTSubject() ?: return Response.status(Response.Status.FORBIDDEN).entity("User not connected").build()
        return Response.ok().entity(friendRequestService.getSendFriendRequests(user.id!!)).build()
    }
}
